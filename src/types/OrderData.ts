export type OrderData = {
  userId: string;
  fullname: string;
  email: string;
  address: string;
  totalPrice: number;
  items: Array<{ price: number; quantity: number }>;
}
