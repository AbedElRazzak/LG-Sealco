"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Shipping from "./Shipping";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import BreadcrumbThree from "../Common/CartSidebarModal/BreadcrumbThree";
import { checkoutService } from "@/services/checkoutService";
import { CheckoutVm, SelectOption } from "@/types/checkout";
// import { toast } from "react-toastify";

const Checkout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const checkoutId = searchParams.get("checkoutId");
  const userToken = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const [formData, setFormData] = useState({
    contactName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    stateOrProvinceId: 0,
    districtId: 0,
    city: "",
    zipCode: "",
    countryId: 118, // Fixed: must be number
  });

  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [existingAddressId, setExistingAddressId] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingTotals, setIsUpdatingTotals] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  // SECURITY CHECK
  useEffect(() => {
    if (!checkoutId) router.push("/cart");
    if (!userToken) router.push("/signin");
  }, [checkoutId, userToken, router]);

  // INITIAL HYDRATION
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!checkoutId || !userToken) return;
      try {
        setIsLoading(true);
        const response = await checkoutService.getShippingInfo(checkoutId, userToken);
        setStateOptions(response.newAddressForm.stateOrProvinces || []);

        if (response.existingShippingAddresses?.length > 0) {
          const addr = response.existingShippingAddresses[0];
          setExistingAddressId(addr.userAddressId);
          setFormData({
            contactName: addr.contactName || "",
            phone: addr.phone || "",
            addressLine1: addr.addressLine1 || "",
            addressLine2: addr.addressLine2 || "",
            stateOrProvinceId: addr.stateOrProvinceId || 0,
            districtId: addr.districtId || 0,
            city: addr.cityName || "",
            zipCode: addr.zipCode || "",
            countryId: addr.countryId || 118
          });
        }
        
        const summary = await checkoutService.updateTaxAndShippingPrices(checkoutId, userToken, {
          selectedShippingMethodName: response.shippingMethod || "Free",
          existingShippingAddressId: response.shippingAddressId || 0,
          newShippingAddress: {},
          newBillingAddress: {},
        });
        setCheckoutData(summary.checkoutVm);
      } catch (error) {
        console.error("Error loading checkout data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [checkoutId, userToken]);

  // REFRESH TOTALS
  const refreshTotals = useCallback(async () => {
    if (!checkoutId || !userToken) return;
    setIsUpdatingTotals(true);
    try {
      const summary = await checkoutService.updateTaxAndShippingPrices(checkoutId, userToken, {
        selectedShippingMethodName: checkoutData?.selectedShippingMethodName || "Free", 
        existingShippingAddressId: existingAddressId,
        newShippingAddress: existingAddressId === 0 ? formData : {}, 
        newBillingAddress: {},
      });
      setCheckoutData(summary.checkoutVm);
    } catch (error) {
      console.error("Failed to refresh totals:", error);
    } finally {
      setIsUpdatingTotals(false);
    }
  }, [checkoutId, userToken, formData, existingAddressId]);

  // WATCH FOR LOCATION CHANGE
  useEffect(() => {
    if (formData.stateOrProvinceId !== 0) {
      refreshTotals();
    }
  }, [formData.stateOrProvinceId, formData.districtId]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const isIdField = ["stateOrProvinceId", "districtId", "countryId"].includes(name);
    const finalValue = isIdField ? parseInt(value) || 0 : value;

    if (existingAddressId !== 0) setExistingAddressId(0);
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!checkoutId || !userToken) return;

      try {
        setIsUpdatingTotals(true);

        // 1. Save Address Info
        await checkoutService.saveShippingInfo(checkoutId, userToken, {
          checkoutId: checkoutId, // Added missing property
          shippingAddressId: existingAddressId,
          billingAddressId: existingAddressId, // Added missing property
          shippingMethod: checkoutData?.selectedShippingMethodName || "Free", // Added missing property
          newAddressForm: existingAddressId === 0 ? formData : ({} as any),
          newBillingAddressForm: ({} as any),
          useShippingAddressAsBillingAddress: true,
          orderNote: orderNote,
        });

        // 2. Complete Order (CoD)
        const result = await checkoutService.completeOrderCoD(checkoutId, userToken);
        
        // Navigate to success page
        router.push(`/order-confirmation?orderId=${result.orderId}`);
      } catch (error: any) {
        console.error("Order Submission Error:", error);
        // Optional: alert("Order failed. Please check your connection.");
      } finally {
        setIsUpdatingTotals(false);
      }
    };

  if (!checkoutId || !userToken) return null;

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree title={"Checkout"} pages={["checkout"]} />
      <section className="py-12 lg:py-20">
        <div className="max-w-[1200px] 2xl:max-w-[1400px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          
          <div className="flex w-full mb-12 overflow-hidden rounded-full border border-gray-100">
            <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">Shopping Cart</div>
            <div className="flex-1 bg-[#116DB2] text-white py-3 text-center font-bold text-sm">Delivery & Payment</div>
            <div className="flex-1 bg-[#F6F6F6] text-gray-400 py-3 text-center font-bold text-sm">Receipt</div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#116DB2] mb-4"></div>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Loading...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
                <div className="flex-1">
                  <div className="space-y-10">
                    <Billing 
                      formData={formData} 
                      onChange={handleInputChange} 
                      stateOptions={stateOptions}
                      userToken={userToken}
                    />
                    <div className="pt-8">
                      <Shipping formData={formData} onChange={handleInputChange} />
                    </div>
                    <div className="pt-8">
                      <label htmlFor="notes" className="block text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
                        Other Notes (optional)
                      </label>
                      <textarea
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        rows={4}
                        placeholder="Notes about your order..."
                        className="w-full border border-gray-200 p-4 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2] text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[450px] relative">
                  <div className="sticky top-24">
                    {isUpdatingTotals && (
                      <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-lg">
                        <div className="flex gap-2">
                           <div className="w-2 h-2 bg-[#116DB2] rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-[#116DB2] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                           <div className="w-2 h-2 bg-[#116DB2] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                        </div>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
                    <div className="border-t border-gray-200">
                      <div className="py-4 space-y-4 max-h-[300px] overflow-y-auto">
                        {checkoutData?.items?.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-start gap-4 text-sm">
                            <p className="font-bold text-gray-800">{item.productName} <span className="text-gray-400">x{item.quantity}</span></p>
                            <span className="font-bold text-black">{item.totalString}</span>
                          </div>
                        ))}
                      </div>

                      <div className="py-4 border-t border-gray-100 space-y-3">
                        <div className="flex justify-between text-sm font-bold text-gray-800">
                          <span>Subtotal</span>
                          <span>{checkoutData?.subTotalString}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-800">
                          <span>Shipping Fee</span>
                          <span>{checkoutData?.shippingAmountString}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-800">
                          <span>Tax</span>
                          <span>{checkoutData?.taxAmountString}</span>
                        </div>
                      </div>

                      <div className="py-6 border-t border-gray-100 mb-8">
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-black">Total</p>
                          <p className="text-2xl font-bold text-[#116DB2]">{checkoutData?.orderTotalString}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* <Coupon /> */}
                        <PaymentMethod />
                      </div>

                      <button
                        type="submit"
                        disabled={!checkoutData?.isValid || isUpdatingTotals}
                        className={`w-full mt-10 text-white py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-colors ${
                          checkoutData?.isValid && !isUpdatingTotals ? "bg-[#116DB2] hover:bg-black" : "bg-red"
                        }`}
                      >
                        {isUpdatingTotals ? "Processing..." : (checkoutData?.isValid ? "Complete Purchase" : "Invalid Order")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Checkout;