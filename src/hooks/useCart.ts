import { useEffect } from "react";
import useCartStore from "@/lib/zustand/useCartStore";
import { fetchCart } from "@/services/cartService"; // Import fetchCart

export const useCart = (userId: string | undefined) => {
  const { setCart } = useCartStore();

  useEffect(() => {
    if (userId) {
      const loadCart = async () => {
        const fetchedCart = await fetchCart(userId);
        setCart(fetchedCart);
      };
      loadCart();
    }
  }, [userId, setCart]);

  return null; // Custom hook hanya menangani efek samping, tidak perlu return apa-apa
};
