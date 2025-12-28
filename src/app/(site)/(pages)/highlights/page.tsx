import Highlights from "@/components/Highlights";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Highlights Page",
  description: "LG Sealco",
  // other metadata
};

const HighlightsPage = () => {
  return (
    <main>
      <Highlights />
    </main>
  );
};

export default HighlightsPage;
