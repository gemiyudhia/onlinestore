import {
  addProductToCart,
  fetchCartFromFirestore,
  removeFromCartFirestore,
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

export async function DELETE(req: NextRequest) {
  try {
    const { userId, itemId } = await req.json();

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "User ID and Item ID are required" },
        { status: 400 }
      );
    }

    await removeFromCartFirestore(userId, itemId);

    return NextResponse.json({
      status: true,
      message: `Item with ID ${itemId} updated in cart (quantity decreased).`,
    });
  } catch (error) {
    console.error("Error removing item from cart in Firestore: ", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
