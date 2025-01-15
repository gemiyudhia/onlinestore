import { checkoutOrders } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, fullname, address, email, totalPrice } = await req.json();
    const result = await checkoutOrders({
      userId,
      fullname,
      email,
      address,
      totalPrice,
    });

    return NextResponse.json(JSON.stringify(result), { status: result.status });
  } catch (error) {
    console.error("API Error: ", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
