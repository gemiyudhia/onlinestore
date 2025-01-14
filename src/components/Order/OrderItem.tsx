import { format } from "date-fns";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ShoppingBag, Calendar, DollarSign, Package } from "lucide-react";
import Image from "next/image";
import { OrderItemProps } from "@/types/OrderItemProps";

const OrderItem = ({ order, index }: OrderItemProps) => (
  <AccordionItem key={order.id} value={`item-${index}`}>
    <AccordionTrigger>
      <div className="flex items-center space-x-4">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <div>
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.createdAt.seconds * 1000), "PPP")}
          </p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="pl-10 space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <p>
            Ordered on:{" "}
            {format(new Date(order.createdAt.seconds * 1000), "PPP")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <p>Total: ${order.totalPrice.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <p className="font-semibold">Items:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            {order.cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 bg-secondary/50 p-2 rounded-md"
              >
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium line-clamp-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default OrderItem;
