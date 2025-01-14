"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useCartStore from "@/lib/zustand/useCartStore";
import { useSession } from "next-auth/react";

export default function CartItems() {
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isClient) {
    return <div>Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <p className="text-center text-xl">Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src={item.image || ""}
              alt={item.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              if (userId) {
                removeFromCart(item.id, userId);
              } else {
                console.log("user id is undefined");
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="text-right font-semibold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </>
  );
}
