'use client'
import { useSearchParams } from "next/navigation";
import BreadcrumbFour from "@/components/Common/BreadcrumbFour";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Read the "q" parameter

  return (
    <>
      <BreadcrumbFour
        title={query ? `Results for "${query}"` : "Search"}
        pages={["Search"]}
      />
      <div className="container py-10 max-w-[1200px] 2xl:max-w-[1400px] w-full mx-auto px-4">
        {query ? (
          <p className="text-gray-600">
            Showing results for: <span className="font-bold text-black">{query}</span>
          </p>
        ) : (
          <p>Please enter a search term in the header.</p>
        )}
        
        {/* Your logic to map through products based on 'query' goes here */}
      </div>
    </>
  );
}