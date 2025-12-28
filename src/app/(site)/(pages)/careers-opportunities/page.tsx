import CareersOpportunities from "@/components/CareersOpportunities";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Career Opportunities Page",
  description: "LG Sealco",
  // other metadata
};

const CareersOpportunitiesPage = () => {
  return (
    <main>
      <CareersOpportunities />
    </main>
  );
};

export default CareersOpportunitiesPage;
