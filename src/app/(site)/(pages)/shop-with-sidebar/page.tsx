import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop Page",
  description: "LG Sealco",
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar slug="" />
    </main>
  );
};

export default ShopWithSidebarPage;
