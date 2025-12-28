import React from "react";

const Coupon = () => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Have any Coupon Code?</h3>
      </div>

      <div className="py-8 px-4 sm:px-8.5">
        <div className="flex gap-4">
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Enter coupon code"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-[#116DB2] focus:ring-[#116DB2]/20"
          />

          <button
            type="submit"
            className="inline-block w-full text-center bg-[#116DB2] text-white py-4 rounded-full font-bold uppercase text-sm hover:bg-black transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
