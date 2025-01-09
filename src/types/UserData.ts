import { CartItem } from "./CartItem";

export type UserData = {
  id: string;
  fullname?: string;
  email: string;
  password?: string;
  role?: string;
  cart: CartItem[];
};
