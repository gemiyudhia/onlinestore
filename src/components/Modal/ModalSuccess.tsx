import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

type SuccessDialogProps = {
  open: boolean;
  onClose: () => void;
  product: {
    title: string;
    image: string;
  };
};

const ModalSuccess = ({ onClose, open, product }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Item Added to Cart</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src={product.image || ""}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm text-gray-500">
              has been added to your cart.
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSuccess;
