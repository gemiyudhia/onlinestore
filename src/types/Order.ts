export type Order = {
  id: string;
  createdAt: { seconds: number };
  totalPrice: number;
  cart: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
};
