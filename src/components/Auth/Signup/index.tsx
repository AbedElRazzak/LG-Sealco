"use client";

import BreadcrumbThree from "@/components/Common/CartSidebarModal/BreadcrumbThree";
import Link from "next/link";
import React, { useState } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const router = useRouter();

  // 1. Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  // 2. UI Feedback States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await register({
        email,
        fullName: `${firstName} ${lastName}`, // Combine names for API
        password,
        confirmPassword,
        callbackUrl: window.location.origin,
      });

      if (response.success) {
        // Redirect to account page upon successful registration
        router.push("/my-account");
      } else {
        setError(response.error || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbThree title={"Register"} pages={["Register"]} />
      <section className="overflow-hidden py-20 bg-white">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8">
          
          {/* Error Message Display */}
          {error && (
            <div className="max-w-[800px] mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form className="max-w-[800px]" onSubmit={handleSubmit}>
            {/* 1. NAME SECTION */}
            <div className="mb-12">
              <div className="flex justify-between items-baseline pb-2 mb-6">
                <h2 className="text-xl font-bold text-[#000000] uppercase tracking-tight">
                  Name
                </h2>
                <span className="text-xs font-bold text-gray-500">*Required</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-black mb-2">First Name*</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-[#E2E2E2] p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-2">Last Name*</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-[#E2E2E2] p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                  />
                </div>
              </div>
            </div>

            {/* 2. LOGIN INFORMATION SECTION */}
            <div className="mb-12">
              <div className="flex justify-between items-baseline pb-2 mb-6">
                <h2 className="text-xl font-bold tracking-tight text-[#000000]">
                  Email / Login Information
                </h2>
                <span className="text-xs font-bold text-gray-500">*Required</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-black mb-2">Email*</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#E2E2E2] p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-2">Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Dynamic type change
                      // placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-[#E2E2E2] p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                    />
                    <button
                      type="button" // Important: specify type="button" so it doesn't submit the form
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-2">Confirm Password*</label>
                  <div className="relative">
                    <input
                      type={showConfirmedPassword ? "text" : "password"} // Dynamic type change
                      // placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-[#E2E2E2] p-3 rounded bg-[#FDFDFD] outline-none focus:border-[#116DB2]"
                    />
                    <button
                      type="button" // Important: specify type="button" so it doesn't submit the form
                      onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmedPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SUBMIT BUTTON */}
            <div className="mt-12 flex flex-col items-start gap-6">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#116DB2] text-white px-16 py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                }`}
              >
                {loading ? "Registering..." : "Submit"}
              </button>

              <p className="text-sm font-medium text-gray-600">
                Already have an account?
                <Link href="/signin" className="text-[#116DB2] font-bold ml-2 hover:underline">
                  Sign in Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;