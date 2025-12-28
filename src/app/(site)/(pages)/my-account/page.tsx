"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyAccount from "@/components/MyAccount";
import { isAuthenticated } from "@/services/authService";

const MyAccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = isAuthenticated();
    
    if (!authStatus) {
      // If not logged in, redirect to the signin page
      router.push("/signin");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  // While checking status or performing redirect, show a loader
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-medium">Checking authentication...</div>
      </div>
    );
  }

  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;