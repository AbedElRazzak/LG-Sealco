"use client";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { checkoutService } from "@/services/checkoutService"; // Adjust path as needed
// import { toast } from "react-toastify"; // Optional: for error feedback

const OrderSummary = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const totalPrice = useSelector(selectTotalPrice);
  // Get token from your Redux auth state (adjust selector based on your actual slice name)
  const userToken = localStorage.getItem("userToken");

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
    };

  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Order Summary</h2>

      <div className="w-full border-t border-[#E2E2E2]">
        {/* Subtotal Item */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm font-bold text-gray-800">Subtotal (VAT included)</p>
          <p className="text-sm font-bold text-black">{totalPrice}$</p>
        </div>

        {/* VAT, Installation, Shipping (Static for now) */}
        {["VAT Fees", "Installation fees", "Shipping fees"].map((label) => (
          <div key={label} className="flex items-center justify-between py-4">
            <p className="text-sm font-bold text-gray-800">{label}</p>
            <p className="text-sm font-bold text-gray-400">0$</p>
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center justify-between py-6 mb-10 border-t border-[#E2E2E2]">
          <p className="text-xl font-bold text-black">Total</p>
          <p className="text-xl font-bold text-black">{totalPrice}$</p>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center w-full">
          <button
            type="button" // Changed from submit to button to prevent form issues
            onClick={handleProceedToCheckout}
            disabled={loading}
            className={`w-full max-w-[450px] ${
              loading ? "bg-gray-400" : "bg-[#116DB2]"
            } text-white py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-colors hover:bg-black flex justify-center items-center`}
          >
            {loading ? (
              <span className="inline-block animate-spin mr-2">...</span>
            ) : null}
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;