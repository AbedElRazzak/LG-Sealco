"use client";
import React, { useState } from "react";

const ProductDetails = () => {
  // Fixed state values to match the logic exactly
  const [activeTab, setActiveTab] = useState("specifications"); 
  const [openSections, setOpenSections] = useState<string[]>(["BASIC SPEC"]);

  const specData = [
    { title: "BASIC SPEC", content: "French Door"  },
    { title: "DIMENSIONS & WEIGHT", content: "Width: 913mm, Height: 1790mm" },
    { title: "FEATURES", content: "Yes" },
    { title: "ICE & WATER SYSTEM",content:  "Water & Ice" },
    { title: "MATERIAL & FINISH",content:  "Black Stainless Steel" },
    { title: "PERFORMANCE", content: "Inverter Linear" },
    { title: "REFRIGERATOR COMPARTMENT",content:  "Tempered Glass" },
    { title: "SMART TECHNOLOGY", content: "Yes" },
  ];

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const expandAll = () => setOpenSections(specData.map((s) => s.title));

  return (
    <div className="w-full bg-white pt-10">
      {/* 1. TAB HEADER */}
      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto border-b-2 border-[#EFEFEF] mb-12 px-4 sm:px-8">
        <div className="flex gap-10">
          {["Overview", "Specifications"].map((tab) => {
            const tabId = tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabId)}
                className={`pb-4 text-sm font-bold transition-all border-b-4 ${
                  activeTab === tabId
                    ? "border-[#116DB2] text-black"
                    : "border-transparent text-gray-400"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 pb-20">
        
        {/* OVERVIEW CONTENT */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            {/* SECTION TITLE & EXPAND ALL */}
            <div className="relative flex justify-center items-center mb-10">
              <h2 className="text-4xl font-bold text-[#000000] text-center tracking-tight">Overview</h2>
              <button 
                onClick={expandAll}
                className="absolute right-0 text-sm font-bold text-gray-900 hover:underline"
              >
                Expand all
              </button>
            </div>

            {/* EXPANDABLE DIVS (ACCORDION) */}
            <div className="border-t-2 border-[#EFEFEF]">
              {specData.map((item) => (
                <div key={item.title} className="border-b-2 border-[#EFEFEF]">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="w-full py-6 flex justify-between items-center text-left group"
                  >
                    <span className="text-lg font-bold text-[#000000] uppercase tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-2xl font-light text-[#000000]">
                      {openSections.includes(item.title) ? "−" : "+"}
                    </span>
                  </button>
                  
                  {openSections.includes(item.title) && (
                    <div className="pb-8 overflow-hidden">
                        <div className="flex flex-col md:flex-row py-2 border-b border-gray-50 last:border-0">
                          <span className="md:w-2/3 text-sm text-gray-600 mt-1 md:mt-0">{item.content}</span>
                        </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* REVIEWS SECTION */}
            <div className="mt-20 pt-10 border-t border-gray-100">
               <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className="w-5 h-5 fill-gray-200" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                     ))}
                  </div>
                  <span className="text-sm text-gray-500 font-bold">(0)</span>
                  <span className="mx-2 h-4 w-[1px] bg-gray-300"></span>
                  <button className="text-sm font-bold text-[#116DB2] border-b border-[#116DB2]">Write a review</button>
               </div>

               <h2 className="text-3xl font-bold text-black mb-6">Reviews</h2>
               <div className="p-10 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center bg-gray-50">
                  <p className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Review this Product</p>
                  <div className="flex gap-2 mb-6">
                     {[...Array(5)].map((_, i) => (
                       <button key={i} className="w-12 h-10 border border-[#116DB2] rounded flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5 fill-[#116DB2]" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                       </button>
                     ))}
                  </div>
                  <p className="text-sm font-medium text-gray-500">Be the first to review this product</p>
               </div>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS CONTENT */}
        {activeTab === "specifications" && (
          <div className="animate-fadeIn">
            {/* SECTION TITLE & EXPAND ALL */}
            <div className="relative flex justify-center items-center mb-10">
              <h2 className="text-4xl font-bold text-[#000000] text-center tracking-tight">Specifications</h2>
              <button 
                onClick={expandAll}
                className="absolute right-0 text-sm font-bold text-gray-900 hover:underline"
              >
                Expand all
              </button>
            </div>

            {/* EXPANDABLE DIVS (ACCORDION) */}
            <div className="border-t-2 border-[#EFEFEF]">
              {specData.map((item) => (
                <div key={item.title} className="border-b-2 border-[#EFEFEF]">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="w-full py-6 flex justify-between items-center text-left group"
                  >
                    <span className="text-lg font-bold text-[#000000] uppercase tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-2xl font-light text-[#000000]">
                      {openSections.includes(item.title) ? "−" : "+"}
                    </span>
                  </button>
                  
                  {openSections.includes(item.title) && (
                    <div className="pb-8 overflow-hidden">
                        <div className="flex flex-col md:flex-row py-2 border-b border-gray-50 last:border-0">
                          <span className="md:w-2/3 text-sm text-gray-600 mt-1 md:mt-0">{item.content}</span>
                        </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* REVIEWS SECTION */}
            <div className="mt-20 pt-10">
               <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className="w-5 h-5 fill-gray-200" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                     ))}
                  </div>
                  <span className="text-sm text-gray-500 font-bold">(0)</span>
                  <span className="mx-2 h-4 w-[1px] bg-gray-300"></span>
                  <button className="text-sm font-bold text-[#116DB2]">Write a review</button>
               </div>

               <h2 className="text-3xl font-bold text-[#000000] mb-6">Reviews</h2>
               <p className="text-sm font-bold text-[#000000] mb-6">Review this Product</p>
               <div className="flex gap-2 mb-6">
                     {[...Array(5)].map((_, i) => (
                       <button key={i} className="w-12 h-10 border border-[#116DB2] rounded flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5 fill-[#116DB2]" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                       </button>
                     ))}
                  </div>
                  <p className="text-sm font-bold text-[#000000] mb-6">Be the first to review this product</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;