import axios from "axios";

export async function fetchProducts() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FAKESTORE_API_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.log("failed to fetch prodcts: ", error);
    throw new Error("Failed to fetch products");
  }
}
