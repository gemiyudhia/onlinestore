"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import Loading from "../Loading/LoadingProducts";
import { fetchProducts } from "@/lib/service/apiServices";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true); // Mulai loading
      try {
        const data = await fetchProducts();
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
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
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

  if (isLoading) {
    return <Loading />;
  }

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
