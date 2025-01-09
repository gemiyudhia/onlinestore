import { UserData } from "@/types/UserData";
import app from "./init";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import bcrypt from "bcrypt";

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
