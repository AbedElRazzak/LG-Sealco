"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { removeItemFromCart, selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { useRouter } from "next/navigation";
import { checkoutService } from "@/services/checkoutService"; 

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const modalRef = useRef<HTMLDivElement>(null);

    const handleProceedToCheckout = async () => {
        // Attempt to get the token from localStorage since it's not in your Redux store
        const userToken = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  
        if (!userToken) {
          // router.push("/signin"); // Redirect to login if no token
          console.log("No token found, redirecting to signin...");
          router.push("/signin");
          return;
        }
  
        setLoading(true);
        try {
          // 1. Call the API to start checkout with empty couponCode string
          const response = await checkoutService.startCheckout(userToken, { 
            couponCode: "" 
          });
          
          // 2. Redirect to /checkout with the GUID
          router.push(`/checkout?checkoutId=${response.checkoutId}`);
        } catch (error: any) {
          console.error("Failed to start checkout:", error);
          // If the token is expired/invalid, you might want to clear it and redirect
          if (error.response?.status === 401) {
              localStorage.removeItem("token");
              router.push("/signin");
          }
        } finally {
          setLoading(false);
        }
        closeCartModal()
      };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeCartModal();
      }
    }
    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartModalOpen, closeCartModal]);

  return (
    <div className={`fixed top-0 left-0 z-99999 w-full h-screen transition-all duration-300 ${
        isCartModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}>
      <div className="absolute inset-0 bg-black/5" onClick={closeCartModal} />
      <div className="max-w-[1400px] mx-auto px-4 relative h-full">
        <div ref={modalRef} className={`absolute top-20 right-4 w-full max-w-[380px] bg-white shadow-2xl rounded-sm border border-gray-100 transition-all duration-300 transform origin-top-right ${
            isCartModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}>
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
            <h2 className="font-bold text-[#010101] text-lg">My Bag</h2>
            <button onClick={closeCartModal} className="text-gray-400 hover:text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-5 no-scrollbar">
            <div className="flex flex-col gap-5">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <SingleItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-[#010101] text-sm">Subtotal:</p>
                <div className="flex items-baseline gap-1 text-black font-bold">
                  <span className="text-lg text-[#010101]">{Number(totalPrice).toFixed(2)}$</span>
                  <span className="text-[10px] text-[#010101] uppercase">TTC</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link onClick={closeCartModal} href="/cart" className="flex-1 flex justify-center items-center h-11 font-bold text-black bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-xs">
                  View Bag
                </Link>
                <Link onClick={handleProceedToCheckout} href="/checkout" className="flex-1 flex justify-center items-center h-11 font-bold text-white bg-[#116DB2] rounded-full hover:bg-[#0d568d] transition-colors text-xs">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;