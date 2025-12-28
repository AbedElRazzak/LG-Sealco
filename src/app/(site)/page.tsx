import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LG Sealco",
  description: "LG Sealco",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
