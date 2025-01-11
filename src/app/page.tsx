import ProductList from "@/components/Products/ProductList";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <ProductList />
    </main>
  );
}
