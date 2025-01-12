import {
  addProductToCart,
  fetchCartFromFirestore,
} from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, product } = await req.json();

    await addProductToCart(userId, product);

    return NextResponse.json({
      status: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log("Error in api route: ", error);
    return NextResponse.json(
      { error: "failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const cart = await fetchCartFromFirestore(userId);
    return NextResponse.json(cart);
  } catch (error) {
    console.log("Error in api route: ", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
