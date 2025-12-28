"use client";
import BreadcrumbThree from "@/components/Common/CartSidebarModal/BreadcrumbThree";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { login } from "@/services/authService"; // Ensure this path matches your folder structure
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const router = useRouter();

  // 1. State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // 2. State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3. Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password, rememberMe });

      if (response.success) {
        // Success logic: Redirect to home or dashboard
        router.push("/my-account");
      } else {
        setError(
          response.error || "Login failed. Please check your credentials."
        );
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbThree title={"Sign in"} pages={["Sign in"]} />

      <section className="py-12 lg:py-20">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-32">
            {/* LEFT SIDE: Sign In Form */}
            <div className="flex-1">
              {/* Display Error Message if it exists */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                  {error}
                </div>
              )}

              <form className="max-w-[480px]" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Email*"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] text-sm outline-none focus:border-[#116DB2]"
                  />
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Dynamic type change
                      placeholder="Password*"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-200 p-3 rounded bg-[#FDFDFD] text-sm outline-none focus:border-[#116DB2] pr-10"
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

                <div className="flex items-center justify-between mb-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-[#116DB2] text-white px-12 py-3 rounded-full font-bold uppercase text-sm transition-colors ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black"
                    }`}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    Remember Me
                  </label>
                </div>

                <Link
                  href="#"
                  className="text-[#116DB2] text-sm font-bold pb-0.5"
                >
                  Forgot Password?
                </Link>
              </form>
            </div>

            {/* RIGHT SIDE: Call to Action */}
            <div className="lg:w-[450px]">
              <h2 className="text-3xl font-bold text-[#000000] mb-8">
                Not a member yet?
              </h2>
              <div className="mb-10">
                <p className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
                  Not a member yet?
                </p>
                <Link
                  href="/signup"
                  className="inline-block w-full text-center bg-[#116DB2] text-white py-4 rounded-full font-bold uppercase text-sm hover:bg-black transition-colors"
                >
                  Sign Up
                </Link>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-black mb-2 uppercase">
                    Enjoy your product to the fullest :
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Maximizing your LG product experience with helpful
                    information about all your registered products
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-black mb-2 uppercase">
                    Let LG know how to reach you :
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Managing your customer profile so LG knows how and when to
                    communicate with you
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-black mb-2 uppercase">
                    Everything in one location :
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    A single account that allows for various interaction with LG
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Support Options */}
        </div>
      </section>
    </div>
  );
};

export default Signin;
