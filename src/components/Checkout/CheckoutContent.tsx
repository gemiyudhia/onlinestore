"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckoutForm from "./CheckoutForm";
import CartItems from "./CartItem";

export default function CheckoutContent() {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
    }
  }, [push, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <CartItems />
          <CheckoutForm
            userId={session.user.id}
            userEmail={session.user.email}
            userName={session.user.fullname}
          />
        </CardContent>
      </Card>
    </div>
  );
}
