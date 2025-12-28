"use client";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCartItems, CartItem } from "@/redux/features/cart-slice";
import { cartService } from "@/services/cartService";

export default function CartInitializer() {
  const dispatch = useDispatch();

  const syncCart = useCallback(async () => {
    const userToken = localStorage.getItem("userToken");
    const customerIdStr = localStorage.getItem("customerId");

    if (!userToken || !customerIdStr) return;
    const customerId = parseInt(customerIdStr, 10);
    if (isNaN(customerId)) return;

    try {
      const cart = await cartService.getCartByCustomerId(customerId, userToken);
      const reduxItems: CartItem[] = cart.items.map((item: any) => ({
        id: Number(item.productId),
        itemId: Number(item.id),
        title: item.productName || "Unknown Product",
        price: Number(item.calculatedProductPrice?.price || 0),
        discountedPrice: Number(item.calculatedProductPrice?.price || 0),
        quantity: Number(item.quantity || 0),
        imgs: {
          thumbnails: [item.thumbnailUrl],
          previews: [item.thumbnailUrl],
        },
      }));

      dispatch(setCartItems(reduxItems));
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  }, [dispatch]);

  // Sync on initial page load
  useEffect(() => {
    syncCart();
  }, [syncCart]);

  return null;
}