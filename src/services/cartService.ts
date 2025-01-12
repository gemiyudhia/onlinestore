export const fetchCart = async (userId: string) => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
