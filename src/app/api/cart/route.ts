import { addProductToCart } from "@/lib/firebase/service";
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
