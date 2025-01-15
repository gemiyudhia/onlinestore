import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";

export function LoadingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Skeleton className="h-8 w-32 ml-5" />
        <div className="ml-auto flex items-center space-x-4">
          <Skeleton className="h-5 w-32" /> {/* User name placeholder */}
          {/* Cart button placeholder */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="relative"
            disabled
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </Button>
          {/* User profile button placeholder */}
          <Button variant="ghost" size="icon" aria-label="Profile" disabled>
            <User className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
