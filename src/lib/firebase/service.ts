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
} from "firebase/firestore";
import bcrypt from "bcrypt";
import { Product } from "@/types/Product";
import useCartStore from "../zustand/useCartStore";

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
    const cart = userData?.cart || []; // Ambil cart jika ada

    // Simpan cart ke Zustand
    useCartStore.getState().setCart(cart); // Memasukkan cart dari Firestore ke Zustand
    return cart;
  } catch (error) {
    console.error("Error fetching cart: ", error);
    throw new Error("Failed to fetch cart from Firestore");
  }
}

