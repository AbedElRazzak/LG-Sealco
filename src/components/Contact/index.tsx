"use client";
import React from "react";
import BreadcrumbFour from "../Common/BreadcrumbFour";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbFour title={"Contact Us"} pages={["Contact Us"]} />

      <section className="py-12">
        <div className="w-full max-w-[1200px] 2xl:max-w-[1600px] px-4 mx-auto sm:px-8">
          {/* HEADER SECTION */}
          <div className="mb-4">
            <p className="text-sm font-regular text-[#4A4A4A] mb-2">
              speak to an LG representative over the phone.
            </p>
            <h1 className="text-3xl font-bold text-[#000000]">
              Call an LG Support Representative
            </h1>
          </div>

          {/* BRANDSHOP INFO BOXES */}
          {/* BRANDSHOP INFO BOXES */}
          <div className="bg-[#F6F6F6] p-8 lg:p-12 rounded-sm mb-12">
            {/* Changed grid-cols-1 for vertical stacking */}
            <div className="grid grid-cols-1 gap-12">
              {/* Dora Brandshop */}
              <div className="pb-8 border-b border-gray-200 md:border-b-0 md:pb-0">
                <h3 className="text-xl font-bold text-[#000000] mb-4">
                  Dora Brandshop
                </h3>
                <p className="text-sm font-bold text-[#010101] mb-3">
                  Dora Highway towards Zalka, facing City Mall, Matn, Lebanon
                </p>
                <div className="text-xs text-[#116DB2] font-bold space-y-1">
                  <p>Fax: 01884034</p>
                  <p>Telephone: 01883083</p>
                </div>
                <p className="text-xs text-[#9C9C9C] mt-4 font-bold">
                  09:00 AM - 06:30 PM
                </p>
              </div>

              {/* Jnah Brandshop - Changed from left border to top border for vertical design */}
              <div className="border-t border-[#E4E4E4] pt-12">
                <h3 className="text-xl font-bold text-[#000000] mb-4">
                  Jnah Brandshop
                </h3>
                <p className="text-sm font-bold text-[#010101] mb-3">
                  Jnah, Adnan Hakim Street, facing BHV, Ishbilia bldg, Beirut,
                  Lebanon
                </p>
                <div className="text-xs text-[#116DB2] font-bold space-y-1">
                  <p>Telephone: 01853893</p>
                </div>
                <p className="text-xs text-[#9C9C9C] mt-4 font-bold">
                  09:00 AM - 06:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form className="max-w-[800px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-black mb-2 ">
                  Inquire Type*
                </label>
                <select className="w-full border border-gray-200 p-3 rounded bg-white text-sm outline-none focus:border-[#116DB2]">
                  <option>Select Inquire Type</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  Honorific Title*
                </label>
                <select className="w-full border border-gray-200 p-3 rounded bg-white text-sm outline-none focus:border-[#116DB2]">
                  <option>Select Honorific</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  First Name*
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  Last Name*
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  Email*
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2 ">
                  Country*
                </label>
                <select className="w-full border border-gray-200 p-3 rounded bg-white text-sm outline-none focus:border-[#116DB2]">
                  <option>Select Country</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-black mb-2 ">
                  Phone (Ex. +961-3-333 333)*
                </label>
                <div className="flex border border-gray-200 rounded overflow-hidden">
                  <div className="bg-gray-50 px-3 flex items-center border-r border-gray-200">
                    🇱🇧
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-3 outline-none focus:border-[#116DB2]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-black mb-2 ">
                  Message*
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-200 p-3 rounded bg-white outline-none focus:border-[#116DB2] resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#116DB2] text-white px-12 py-3 rounded-full font-bold  text-sm tracking-wider transition-colors hover:bg-black"
            >
              Submit
            </button>
          </form>

          {/* MAP PLACEHOLDER */}
          <div className="mt-20 h-[400px] bg-gray-100 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold ">
              Map View Component Here
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
