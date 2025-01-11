import { fetchProducts } from "@/lib/axios/fetchProducts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
