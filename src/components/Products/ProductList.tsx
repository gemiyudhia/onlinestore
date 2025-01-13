"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
      setFilteredProducts(data);

      const uniqueCategories = Array.from(
        new Set(
          data
            .map((product) => product.category)
            .filter((category) => category !== undefined)
        )
      );
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters: {
    category: string;
    priceRange: string;
    rating: number;
    search: string;
  }) => {
    const filtered = products.filter((product) => {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      return (
        (filters.category === "" || product.category === filters.category) &&
        (filters.priceRange === "all" ||
          (product.price >= minPrice && product.price <= maxPrice)) &&
        product.rating.rate >= filters.rating &&
        (filters.search === "" ||
          product.title.toLowerCase().includes(filters.search.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <ProductFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
