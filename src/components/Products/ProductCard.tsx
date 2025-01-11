"use client";

import { Product } from "@/types/Product";
// import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    console.log(`Added ${product.title} to cart`);
    // Here you would typically dispatch an action to add the item to the cart
  };

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow p-4">
        <div className="relative w-full h-48 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
          {product.description}
        </p>
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
      </CardContent>
      <CardFooter className="flex flex-col p-4 bg-gray-50 gap-2">
        <div className="flex justify-between items-center w-full">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-sm text-yellow-500 mr-1">★</span>
            <span className="text-sm">
              {product?.rating.rate.toFixed(1)} ({product?.rating.count})
            </span>
          </div>
        </div>
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
