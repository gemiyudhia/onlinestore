import { CartItem } from "./CartItem";

export type CartState = {
  cart: CartItem[]; 
  addToCart: (newItem: CartItem) => void; 
  setCart: (cart: CartItem[]) => void;
};
