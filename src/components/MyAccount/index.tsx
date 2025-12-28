"use client";
import React, { useState } from "react";
import AddressModal from "./AddressModal";
import Orders from "../Orders";
import BreadcrumbThree from "../Common/CartSidebarModal/BreadcrumbThree";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { useEffect } from "react";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState(false);
  const [fullName, setFullName] = useState<string>("Guest");

  useEffect(() => {
    // 1. Get the name from localStorage when the component mounts
    const storedName = localStorage.getItem("userFullName");
    if (storedName) {
      setFullName(storedName);
    }
  }, []);

  const handleLogout = async () => {
  // 1. (Optional) Call your API logout if you want to clear the server session
  try {
    await logout(); 
  } catch (err) {
    console.error("API logout failed, but we will clear local data anyway");
  }

  // 2. Clear the tokens from the browser
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");

  // 3. Send the user back to the sign-in page
  // Using window.location.href is the "safest" way to clear all JS state
  window.location.href = "/signin";
};

  // Design-specific dashboard cards
  const dashboardCards = [
    { id: "account-details", title: "Personal Data", desc: "SHOW OR UPDATE YOUR PERSONAL INFORMATION" },
    { id: "addresses", title: "Addresses", desc: "MANAGE YOUR BILLING AND ADDRESSES" },
    { id: "dashboard", title: "Loyalty + Rewards", desc: "VIEW YOUR LOYALTY DASHBOARD" },
    { id: "orders", title: "Orders", desc: "CHECK THE STATUS OF YOUR ORDERS OR SEE PAST ORDERS" },
    { id: "wishlist", title: "Wish List", desc: "VIEW AND MODIFY ITEMS ON YOUR LIST OR INVITE FRIENDS" },
    { id: "gifts", title: "My Gifts", desc: "VIEW AND MODIFY YOUR GIFT REGISTRIES" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree title={"My Account"} pages={["my account"]} />

      <section className="py-12">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            
            {/* LEFT SIDEBAR: Kept functionality but updated to LG Minimalist Style */}
            <aside className="lg:w-[280px] flex-shrink-0">
              <nav className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[#000000] mb-4">My Account</h3>
                  <ul className="space-y-3">
                    <li><button onClick={() => setActiveTab("account-details")} className={`text-sm font-medium transition-colors ${activeTab === "account-details" ? "text-[#116DB2]" : "text-gray-400 hover:text-[#000000]"}`}>Personal</button></li>
                    <li><button onClick={() => setActiveTab("addresses")} className={`text-sm font-medium transition-colors ${activeTab === "addresses" ? "text-[#116DB2]" : "text-gray-400 hover:text-[#000000]"}`}>Data Addresses</button></li>
                    <li><button onClick={() => setActiveTab("dashboard")} className={`text-sm font-medium transition-colors ${activeTab === "dashboard" ? "text-[#116DB2]" : "text-gray-400 hover:text-[#000000]"}`}>Loyalty Dashboard</button></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#000000] mb-4">Order Information</h3>
                  <ul className="space-y-3">
                    <li><button onClick={() => setActiveTab("orders")} className={`text-sm font-medium transition-colors ${activeTab === "orders" ? "text-[#116DB2]" : "text-gray-400 hover:text-[#000000]"}`}>Order History</button></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#000000] mb-4">Wish List</h3>
                  <ul className="space-y-3">
                    <li><button onClick={() => setActiveTab("wishlist")} className="text-sm font-medium text-gray-400 hover:text-[#000000] transition-colors">Modify Wish List</button></li>
                  </ul>
                </div>
              </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 pb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#000000] tracking-tight">
                  My Account | {fullName}
                </h1>
                <button onClick={handleLogout} className="bg-[#116DB2] text-white px-10 py-2.5 rounded-full font-bold text-sm hover:bg-black transition-colors uppercase">
                  Logout
                </button>
              </div>

              {/* DASHBOARD GRID: Visible only when 'dashboard' tab is active */}
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  {dashboardCards.map((card, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(card.id)}
                      className="flex flex-col items-center justify-center text-center p-10 border border-gray-200 rounded-xl hover:border-[#116DB2] transition-all group min-h-[180px]"
                    >
                      <span className="text-3xl font-bold text-[#000000] mb-3 group-hover:text-[#116DB2]">
                        {card.title}
                      </span>
                      <span className="text-md font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                        {card.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === "orders" && <Orders />}

              {/* ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="border border-gray-200 rounded-xl p-8 bg-white relative">
                    <h3 className="text-lg font-bold mb-4 uppercase">Shipping Address</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">7398 Smoke Ranch Road<br/>Las Vegas, Nevada 89128</p>
                    <button onClick={() => setAddressModal(true)} className="text-[#116DB2] font-bold text-sm border-b border-[#116DB2]">Edit Address</button>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-8 bg-white">
                    <h3 className="text-lg font-bold mb-4 uppercase">Billing Address</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">Same as shipping address</p>
                    <button onClick={() => setAddressModal(true)} className="text-[#116DB2] font-bold text-sm border-b border-[#116DB2]">Edit Address</button>
                  </div>
                </div>
              )}

              {/* ACCOUNT DETAILS / PERSONAL DATA TAB */}
              {activeTab === "account-details" && (
                <div className="max-w-2xl animate-fadeIn">
                   <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold mb-2 uppercase">First Name*</label>
                            <input type="text" defaultValue="James" className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold mb-2 uppercase">Last Name*</label>
                            <input type="text" defaultValue="Septimus" className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]" />
                         </div>
                      </div>
                      <button className="bg-[#116DB2] text-white px-8 py-3 rounded-full font-bold text-sm uppercase">Save Changes</button>
                   </form>
                </div>
              )}
              
              <div className="mt-20">
                <p className="text-[10px] text-gray-400 italic font-medium">
                  * Key feature may different from Key Spec
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>

      <AddressModal isOpen={addressModal} closeModal={() => setAddressModal(false)} />
    </div>
  );
};

export default MyAccount;