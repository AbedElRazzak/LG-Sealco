"use client";
import React, { useEffect, useState } from "react";
import { checkoutService } from "@/services/checkoutService";
import { District, SelectOption } from "@/types/checkout";

interface BillingProps {
  formData: any;
  onChange: (e: any) => void;
  stateOptions: SelectOption[]; // Passed from the initial getShippingInfo call
  userToken: string;
}

const Billing = ({ formData, onChange, stateOptions, userToken }: BillingProps) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Fetch districts whenever the stateOrProvinceId changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.stateOrProvinceId && formData.stateOrProvinceId !== 0) {
        setLoadingDistricts(true);
        try {
          const data = await checkoutService.getDistricts(formData.stateOrProvinceId, userToken);
          setDistricts(data);
        } catch (error) {
          console.error("Failed to fetch districts", error);
        } finally {
          setLoadingDistricts(false);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [formData.stateOrProvinceId, userToken]);

  return (
    <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">Billing details</h2>

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="w-full">
            <label className="block mb-2.5 font-bold text-xs uppercase">Full Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={onChange}
              className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2.5 font-bold text-xs uppercase">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
            />
          </div>
        </div>

        {/* State/Province Dropdown */}
        <div className="mb-5">
          <label className="block mb-2.5 font-bold text-xs uppercase">State / Province *</label>
          <select
            name="stateOrProvinceId"
            value={formData.stateOrProvinceId}
            onChange={(e) => onChange({ target: { name: "stateOrProvinceId", value: parseInt(e.target.value) } })}
            className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
          >
            <option value="0">Select a State</option>
            {stateOptions?.map((state) => (
              <option key={state.value} value={state.value}>
                {state.text}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown (Cascading) */}
        <div className="mb-5">
          <label className="block mb-2.5 font-bold text-xs uppercase">
            District {loadingDistricts && <span className="animate-pulse text-[#116DB2]">(Loading...)</span>}
          </label>
          <select
            name="districtId"
            value={formData.districtId || 0}
            onChange={(e) => onChange({ target: { name: "districtId", value: parseInt(e.target.value) } })}
            disabled={districts.length === 0}
            className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2] disabled:opacity-50"
          >
            <option value="0">Select a District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address Lines */}
        <div className="mb-5">
          <label className="block mb-2.5 font-bold text-xs uppercase">Street Address *</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={onChange}
            placeholder="Main Street, Building..."
            className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2] mb-3"
          />
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={onChange}
            placeholder="Floor, Apartment (optional)"
            className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
          />
        </div>

        {/* City & Zip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2.5 font-bold text-xs uppercase">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
            />
          </div>
          <div>
            <label className="block mb-2.5 font-bold text-xs uppercase">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChange}
              className="rounded-md border border-gray-300 bg-gray-50 w-full py-2.5 px-5 outline-none focus:border-[#116DB2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;