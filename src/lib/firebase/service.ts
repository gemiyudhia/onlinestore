import { UserData } from "@/types/UserData";
import app from "./init";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import { Product } from "@/types/Product";
import useCartStore from "../zustand/useCartStore";
import { CartItem } from "@/types/CartItem";
import { CheckoutUserData } from "@/types/CheckoutUserData";

const firestore = getFirestore(app);

export async function register(data: UserData) {
  if (!data.email || !data.password) {
    return {
      status: false,
      statusCode: 400,
      message: "Email and Password are required",
    };
  }

  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    return { status: false, statusCode: 400, message: "User already exists" };
  } else {
    if (!data.cart) {
      data.cart = [];
    }

    if (!data.role) {
      data.role = "member";
    }

    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return {
        status: true,
        statusCode: 200,
        message: "User created successfully",
      };
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: 500, message: "Error creating user" };
    }
  }
}

export async function login(data: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    return user[0];
  } else {
    return null;
  }
}

export async function addProductToCart(userId: string, product: Product) {
  if (!userId) {
    throw new Error("User ID is required to add items to the cart.");
  }

  try {
    const userRef = doc(firestore, "users", userId);

    // Ambil data keranjang pengguna
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // Periksa apakah produk sudah ada di keranjang
    const cart = userData?.cart || [];
    const existingProduct = cart.find(
      (item: Product) => item.id === product.id
    );

    if (existingProduct) {
      // Jika produk sudah ada, tingkatkan jumlah (quantity)
      const updatedCart = cart.map((item: Product) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      await updateDoc(userRef, { cart: updatedCart });
    } else {
      // Jika produk belum ada, tambahkan ke keranjang
      await updateDoc(userRef, {
        cart: arrayUnion({ ...product, quantity: 1 }),
      });
    }
  } catch (error) {
    console.error("Error adding to cart: ", error);
    throw new Error("Failed adding to cart");
  }
}

export async function fetchCartFromFirestore(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to fetch cart");
  }

  try {
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log("User not found");
      return [];
    }

    const userData = userDoc.data();
    const cart = userData?.cart || [];

    useCartStore.getState().setCart(cart);
    return cart;
  } catch (error) {
    console.error("Error fetching cart: ", error);
    throw new Error("Failed to fetch cart from Firestore");
  }
}

export async function removeFromCartFirestore(userId: string, itemId: number) {
  try {
    // Referensi ke dokumen user berdasarkan userId
    const userDocRef = doc(firestore, "users", userId);

    // Ambil data user dari Firestore
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();

    if (!userData || !userData.cart) {
      throw new Error("Cart not found or no items to remove.");
    }

    const cart = userData.cart as CartItem[];

    // Cari item dalam cart berdasarkan itemId
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            // Jika quantity lebih dari 1, kurangi quantity
            return { ...item, quantity: item.quantity - 1 };
          }
          // Jika quantity 1, hapus item dari cart
          return null;
        }
        return item;
      })
      .filter((item) => item !== null); // Hapus item yang null (jika quantity sudah 1)

    // Update array cart di Firestore
    await updateDoc(userDocRef, { cart: updatedCart });

    console.log(`Item with ID ${itemId} updated in cart (quantity decreased).`);
  } catch (error) {
    console.error("Error removing item from cart in Firestore: ", error);
    throw error;
  }
}

export async function checkoutOrders(data: CheckoutUserData) {
  try {
    const userRef = doc(firestore, "users", data.userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return { error: "user not found", status: 404 };
    }

    const userData = userSnap.data();
    const userCart = userData.cart;

    if (!userCart || userCart.length === 0) {
      return { error: "cart is empty", status: 400 };
    }

    const orderData = {
      userId: data.userId,
      fullname: data.fullname,
      email: data.email,
      address: data.address,
      totalPrice: data.totalPrice,
      cart: userCart,
      createdAt: serverTimestamp(),
    };

    const orderRef = await addDoc(collection(firestore, "orders"), orderData);

    await updateDoc(userRef, { cart: [] });

    return {
      message: "order created successfully",
      orderId: orderRef.id,
      status: 201,
    };
  } catch (error) {
    console.error("Error in checkoutOrders: ", error);
    return { error: error, status: 500 };
  }
}

export async function getOrdersByUserId(userId: string) {
  const orderRef = collection(firestore, "orders");
  const q = query(orderRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log("Failed to fetch: ", error);
    throw new Error("Failed to fetch orders.");
  }
}
