"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BreadcrumbThree from "../Common/CartSidebarModal/BreadcrumbThree";
import { orderService } from "@/services/orderService";
import { OrderDetailVm } from "@/types/order";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderDetailVm | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllItemsFromCart());
    const fetchOrder = async () => {
      const userToken = localStorage.getItem("userToken");
      if (orderId && userToken) {
        try {
          const data = await orderService.getOrderDetails(orderId, userToken);
          setOrder(data);
        } catch (error) {
          console.error("Order not found or access denied");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="py-20 text-center animate-pulse font-bold">Retrieving Receipt...</div>;
  if (!order) return <div className="py-20 text-center">Order not found. Please check your account dashboard.</div>;

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree title={"Receipt"} pages={["receipt"]} />

      <section className="py-12">
        <div className="max-w-[1200px] 2xl:max-w-[1400px] w-full mx-auto px-4">
          
          {/* STEP INDICATOR - COMPLETED */}
          <div className="flex w-full mb-10 overflow-hidden rounded-full border border-gray-100">
            <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">Shopping Cart</div>
            <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">Delivery & Payment</div>
            <div className="flex-1 bg-[#116DB2] text-white py-3 text-center font-bold text-sm">Receipt</div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center mb-10">
            <h1 className="text-3xl font-bold text-black mb-2">Success! Your order is confirmed.</h1>
            <p className="text-gray-600">A confirmation email has been sent to <span className="font-bold text-black">{order.customerEmail}</span></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Order Items & Shipping */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Shipping Info Card */}
              <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Recipient</p>
                    <p className="font-bold text-black">{order.shippingAddress.contactName}</p>
                    <p className="text-sm">{order.shippingAddress.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Address</p>
                    <p className="text-sm">{order.shippingAddress.addressLine1}</p>
                    <p className="text-sm">{order.shippingAddress.addressLine2}</p>
                    <p className="text-sm">{order.shippingAddress.cityName}, {order.shippingAddress.stateOrProvinceName}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">Product</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500">Qty</th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-black">{item.productName}</p>
                          <p className="text-xs text-gray-400">Unit Price: {item.productPriceString}</p>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-gray-700">{item.quantity}</td>
                        <td className="px-6 py-4 text-right font-bold text-black">{item.rowTotalString}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h2 className="font-bold text-black text-lg mb-6 pb-2 border-b">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-black">{order.subtotalString}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping ({order.shippingMethod})</span>
                    <span className="font-bold text-black">{order.shippingAmountString}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-bold">-{order.discountAmountString}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-bold text-black">{order.taxAmountString}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                  <span className="text-lg font-bold text-black">Total Paid</span>
                  <span className="text-2xl font-black text-[#116DB2]">{order.orderTotalString}</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Payment Method</p>
                    <p className="text-sm font-bold text-black uppercase">{order.paymentMethod}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Order Status</p>
                    <p className="text-sm font-bold text-[#116DB2]">{order.orderStatusString}</p>
                  </div>
                </div>

                <Link href="/shop" className="block w-full text-center bg-black text-white py-4 rounded-full font-bold uppercase text-xs mt-8 hover:bg-[#116DB2] transition-all">
                  Back to Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;