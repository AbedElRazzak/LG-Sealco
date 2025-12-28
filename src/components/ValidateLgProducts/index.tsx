"use client";
import React from "react";
import Image from "next/image";
import BreadcrumbThree from "../Common/CartSidebarModal/BreadcrumbThree";

export default function ValidateLgProduct() {
  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree
        title={"Validate LG Product's Serial Number"}
        pages={["Validate LG Product's Serial Number"]}
      />

      <section className="py-8 max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4">
        <div className="">
          <form className="flex flex-col">
            
            {/* CATEGORY SELECT SECTION */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-black mb-4">
                Select a product category from the below list
              </label>
              <select className="w-full lg:w-[400px] border border-gray-200 p-3 rounded bg-white text-sm outline-none focus:border-[#116DB2]">
                <option>TV</option>
                <option>Home Appliances</option>
                <option>Air Conditioners</option>
              </select>
            </div>

            {/* INSTRUCTIONAL IMAGE */}
            <div className="flex flex-col items-start mb-8">
              <div className="relative w-full max-w-[400px] aspect-[4/3] mb-6">
                <Image
                  src="/images/validate/validate-product.png" 
                  alt="Serial number location guide"
                  fill
                  className="object-contain"
                />
              </div>
              
              <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[600px]">
                Serial number label is located at the back of the TV. You can also check
                for the serial number on the LG TV product box prior to purchase to
                make sure it is under Sealco warranty.
              </p>
            </div>

            {/* SCAN BARCODE BUTTON */}
            <div className="mb-10">
              <button
                type="button"
                className="w-full lg:w-[400px] border border-gray-200 py-3 rounded-full font-bold text-black text-sm hover:bg-gray-50 transition-colors"
              >
                Scan Serial Number Barcode
              </button>
            </div>

            {/* DIVIDER */}
            <div className="relative flex items-center w-full lg:w-[400px] mb-10">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase">Or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* MANUAL ENTRY SECTION */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-black mb-4">
                Enter serial number manually
              </label>
              <input
                type="text"
                placeholder="Enter serial number"
                className="w-full lg:w-[400px] border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2]"
              />
            </div>

            {/* VALIDATE BUTTON */}
            <div>
              <button
                type="submit"
                className="w-full lg:w-[400px] bg-[#116DB2] text-white py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-colors hover:bg-black"
              >
                Validate My LG Product
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}