import Link from "next/link";
import React from "react";
import ChildCategoryCarousel from "../ChildCategoryCarousels";
import categoryData from "../ChildCategoryCarousels/categories";
import CategoryHero from "./CategoryHero";

const Breadcrumb = ({ title, pages }) => {
  return (
    <div className="overflow-hidden shadow-breadcrumb">
      <div className="border-t border-gray-3">
        <div className="w-full max-w-[1200px] 2xl:max-w-[1600px] px-4 mx-auto sm:px-8 apb-5 pt-4 axl:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <ul className="flex items-center gap-2 ">
              <li className="text-sm hover:text-[#116DB2]">
                <Link href="/">Home /</Link>
              </li>

              {pages.length > 0 &&
                pages.map((page, key) => (
                  <li
                    className="text-sm font-regular last:text-[#116DB2] capitalize"
                    key={key}
                  >
                    {page}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#000000] font-bold text-xl sm:text-6xl bold py-4">
              {title}
            </h1>
            <p className="max-w-6xl text-center">
              Make the most out of life. Whether you're replacing a kitchen
              appliance, upgrading your laundry or furnishing your whole house,
              LG's stylish & innovative appliances are built to suit your
              lifestyle.
            </p>
          </div>
          {/* <ChildCategoryCarousel categories={categoryData} /> */}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
