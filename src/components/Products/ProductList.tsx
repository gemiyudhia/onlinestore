import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
