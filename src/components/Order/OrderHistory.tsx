"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import OrderItem from "./OrderItem";
import { Order } from "@/types/Order";

const OrderHistory = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user.id) {
        try {
          const res = await fetch(`/api/orders?userId=${session.user.id}`);
          const data = await res.json();

          if (res.ok) {
            setOrders(data);
          } else {
            console.error("Failed to fetch orders:", data.error);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [session, status]);

  if (!session) {
    return (
      <Card className="max-w-4xl mx-auto mt-10">
        <CardContent className="p-6">
          <p className="text-center text-xl mb-4">
            You must be logged in to view this page.
          </p>
          <Link href="/login" passHref>
            <Button className="w-full">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto mt-10">
        <CardContent className="p-6">
          <p className="text-center text-xl mb-4">You have no order history.</p>
          <Link href="/shop" passHref>
            <Button className="w-full">Go to Shop</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Order History</CardTitle>
          <CardDescription>View details of your past orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order, index) => (
              <OrderItem key={order.id} order={order} index={index} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
