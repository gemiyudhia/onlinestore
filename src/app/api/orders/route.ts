import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getOrdersByUserId } from "@/lib/firebase/service";

export async function GET(req: NextRequest) {
  // Ambil userId dari query parameter URL
  const userId = req.nextUrl.searchParams.get("userId");

  // Pastikan userId ada dan valid
  if (!userId) {
    return NextResponse.json(
      { error: "userId parameter is required." },
      { status: 400 }
    );
  }

  // Ambil sesi pengguna menggunakan next-auth
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to view this page." },
      { status: 401 }
    );
  }

  try {
    // Panggil fungsi dari firebaseService untuk mengambil data pesanan
    const orders = await getOrdersByUserId(userId);

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to fetch orders." },
      { status: 500 }
    );
  }
}
