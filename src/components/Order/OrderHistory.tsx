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
import OrderHistoryLoading from "../Loading/OrderHistoryLoading";
import { fetchUserOrders } from "@/lib/service/apiServices";

const OrderHistory = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      if (session?.user.id) {
        try {
          const data = await fetchUserOrders(session.user.id);
          setOrders(data);
        } catch (error) {
          console.log("Error fetching orders:", error);
        }
      }
    };

    if (status === "authenticated") {
      loadOrders();
    }
  }, [session, status]);

  if (status === "loading") {
    return <OrderHistoryLoading />;
  }

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
          <Link href="/" passHref>
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
