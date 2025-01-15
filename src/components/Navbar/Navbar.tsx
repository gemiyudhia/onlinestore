"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/zustand/useCartStore";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCart } from "@/hooks/useCart";
import { LoadingNavbar } from "../Loading/LoadingNavbar";

export function Navbar() {
  const { data: session, status } = useSession();
  const { cart, removeFromCart } = useCartStore();

  useCart(session?.user?.id);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const userId = session?.user?.id;

  if (status === "loading") {
    return <LoadingNavbar />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="font-bold text-2xl italic ml-5">
          GemiStore
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {status === "authenticated" && <h4>{session?.user?.fullname}</h4>}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cart"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              {cart.length === 0 ? (
                <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
              ) : (
                <>
                  {cart.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      className="flex justify-between"
                    >
                      <div>
                        <p>{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
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
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <div className="flex w-full justify-between font-bold">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/checkout" className="w-full">
                      <Button className="w-full">Checkout</Button>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Profile">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/order" className="w-full">
                  Order History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {status === "authenticated" ? (
                  <Button onClick={() => signOut()} className="bg-red-500">
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="bg-blue-500">Login</Button>
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
