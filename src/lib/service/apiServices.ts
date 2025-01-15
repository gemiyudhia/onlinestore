import { OrderData } from "@/types/OrderData";
import { Product } from "@/types/Product";
import { Order } from "@/types/Order";

// checkout api call
export async function submitCheckout(orderData: OrderData) {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to place order.");
    }

    return await response.json();
  } catch (error) {
    console.error("Checkout API error:", error);
    throw error;
  }
}

// products api call
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// history api call
export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  const response = await fetch(`/api/orders?userId=${userId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch orders");
  }
  return response.json();
};
