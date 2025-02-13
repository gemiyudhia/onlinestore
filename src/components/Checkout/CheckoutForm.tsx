"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import useCartStore from "@/lib/zustand/useCartStore";
import { submitCheckout } from "@/lib/service/apiServices";

interface CheckoutFormProps {
  userId: string;
  userEmail: string;
  userName: string;
}

export default function CheckoutForm({
  userId,
  userEmail,
  userName,
}: CheckoutFormProps) {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { push } = useRouter();
  const { cart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!address.trim()) {
      setError("Address is required.");
      return;
    }

    const orderData = {
      userId,
      fullname: userName,
      email: userEmail,
      address,
      totalPrice,
      items: cart,
    };

    try {
      await submitCheckout(orderData);
      push("/checkout/thank-you");
    } catch (error) {
      alert(error || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="mt-6">
        <Label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Shipping Address
        </Label>
        <Input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full"
          placeholder="Enter your address"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <CardFooter>
        <Button className="w-full" onClick={handleCheckout}>
          Complete Order
        </Button>
      </CardFooter>
    </>
  );
}
