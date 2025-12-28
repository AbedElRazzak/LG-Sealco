"use client";
import React from "react";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import BreadcrumbThree from "../Common/CartSidebarModal/BreadcrumbThree";
import Link from "next/link";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree title={"Shopping Cart"} pages={["Shopping Cart"]} />

      {cartItems.length > 0 ? (
        <section className="py-12">
          <div className="max-w-[1200px] 2xl:max-w-[1400px] w-full mx-auto px-4">
            {/* 1. SHOPPING CART TITLE */}
  

            {/* 2. STEP INDICATOR (LG Style) */}
            <div className="flex w-full mb-10 overflow-hidden rounded-full border border-gray-100">
              <div className="flex-1 bg-[#116DB2] text-white py-3 text-center font-bold text-sm">
                Shopping Cart
              </div>
              <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">
                Delivery & Payment
              </div>
              <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">
                Receipt
              </div>
            </div>

            {/* 3. PRODUCT TABLE HEADERS
                Updated grid to match your request: size removed, titles outlined/aligned.
            */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[900px]">
                {/* 3. PRODUCT TABLE HEADERS */}
                <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_0.5fr_50px] border-b border-gray-200 pb-4 mb-6 px-4">
                  <p className="text-sm font-bold text-black uppercase">
                    Product
                  </p>
                  <p className="text-sm font-bold text-black uppercase text-center">
                    Unit Price
                  </p>
                  <p className="text-sm font-bold text-black uppercase text-center">
                    Quantity
                  </p>
                  <p className="text-sm font-bold text-black uppercase text-center">
                    Subtotal
                  </p>
                  <p className="invisible">Action</p>
                </div>

                {/* 4. CART ITEMS 
                    Ensure SingleItem component uses: 
                    className="grid grid-cols-[2.5fr_1.2fr_1.2fr_1.2fr_50px] items-center px-4"
                */}
                <div className="flex flex-col gap-8">
                  {cartItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                </div>
              </div>
            </div>

            {/* 5. SEND AS A GIFT SECTION */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  id="gift"
                  className="w-5 h-5 rounded border-gray-300 accent-[#116DB2]"
                />
                <label
                  htmlFor="gift"
                  className="text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  Send as a gift
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-2 uppercase">
                    To*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-2 uppercase">
                    From*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase">
                  Message*
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] resize-none outline-none focus:border-[#116DB2]"
                ></textarea>
              </div>
              <div className="flex gap-4 mb-16">
                <button className="bg-[#116DB2] text-white px-10 py-3 rounded-full font-bold text-sm uppercase transition-colors hover:bg-black">
                  Save
                </button>
                <button className="bg-white border border-gray-200 text-black px-10 py-3 rounded-full font-bold text-sm uppercase hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>

            {/* 6. ORDER SUMMARY */}
            <div className="w-full max-w-[1200px] 2xl:max-w-[1600px] mx-auto">
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <div className="py-40 text-center">
          <p className="text-xl font-bold text-gray-400 mb-6">
            Your cart is empty!
          </p>
          <Link
            href="/shop-with-sidebar"
            className="inline-block bg-[#116DB2] text-white py-4 px-12 rounded-full font-bold transition-transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
