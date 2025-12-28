import Faq from "@/components/Faq";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ Page",
  description: "LG Sealco",
  // other metadata
};

const FaqPage = () => {
  return (
    <main>
      <Faq />
    </main>
  );
};

export default FaqPage;
