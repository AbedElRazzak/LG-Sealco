"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import CategoryDropdown from "./CategoryDropdown";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import Image from "next/image";
import CategoryHero from "../Common/CategoryHero";
import { categoryService } from "@/services/categoryService";
import { CategoryDetails, CategoryProduct } from "@/types/Category";
import ChildCategoryCarousel from "../ChildCategoryCarousels";
import BreadCrumbBanner from "../Common/BreadCrumbBanner";

interface Props {
  slug: string;
}

const ShopWithSidebar = ({slug}:Props) => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [category, setCategory] = useState<CategoryDetails | null>(null);
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 2. Fetch Category Details
        const categoryData = await categoryService.getCategoryBySlug(slug);
        
        if (!categoryData) {
          setError(true);
          return;
        }
        
        setCategory(categoryData);

        // 3. Fetch Products using the ID from categoryData
        const productsResponse = await categoryService.getProductsByCategoryId(
          categoryData.id,
          1,
          12
        );

        setProducts(productsResponse.items);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Effect runs when params change

  // Example sub-categories from image_19ed67.png
  const subCategories = [
    { name: "InstaView Refrigerator", img: "/images/subcat/instaview.png" },
    { name: "Door-in-Door™ Refrigerator", img: "/images/subcat/doorindoor.png" },
    { name: "Multi-Door Refrigerators", img: "/images/subcat/multidoor.png" },
    { name: "Side by Side Refrigerators", img: "/images/subcat/sidebyside.png" },
    { name: "Top Freezer Refrigerators", img: "/images/subcat/topfreezer.png" },
    { name: "1 Door Refrigerators", img: "/images/subcat/onedoor.png" },
  ];

  const categories = [
    { name: "InstaView™ Door-in-Door®", products: 11, isRefined: false },
    { name: "Door-in-Door™ Refrigerator", products: 2, isRefined: false },
    { name: "Multi-Door Refrigerators", products: 3, isRefined: false },
    { name: "Top Freezer Refrigerators", products: 7, isRefined: false },
  ];

  return (
    <div className="bg-white">
      <Breadcrumb title={category?.name} pages={[`${category?.name}`]} />
      <ChildCategoryCarousel categories={category?.subCategories} />
      <CategoryHero />
      {/* 3. Main Content Area */}
      <section className="pb-20 aborder-t border-gray-200 pt-10 ">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] px-4 w-full mx-auto">
          
          {/* Top Bar Filter Toggle & Sort */}
          <div className="flex items-center justify-between mb-8 border-b border-[#E2E2E2] pb-4">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setProductSidebar(true)}
                className="flex items-center gap-2 font-bold text-sm uppercase"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
                </svg>
                Filters
              </button>
              <span className="text-gray-500 text-sm font-medium">{shopData.length} Results</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">Sort:</span>
              <CustomSelect options={[{label: "Newest", value: "new"}]} />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-10">
            {/* Sidebar Filters (image_287620.jpg style) */}
            <aside className={`xl:w-[280px] w-full ${productSidebar ? 'block' : 'hidden xl:block'}`}>
              <div className="space-y-8">
                {/* Type Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <CategoryDropdown categories={categories} />
                </div>
                
                {/* Door Type */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-sm uppercase mb-4">Door Type</h3>
                  {/* Reuse GenderDropdown style for Door Type items */}
                  <ul className="space-y-3">
                    {["Instaview Door", "Door-in-Door", "Multi Doors"].map(door => (
                      <li key={door} className="flex items-center gap-3 text-sm">
                        <input type="checkbox" className="w-4 h-4 accent-red-600" />
                        <span>{door}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color (Circular Swatches) */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-sm uppercase mb-4">Color</h3>
                  <div className="flex gap-3">
                    <button className="w-6 h-6 rounded-full bg-black border border-gray-300" title="Black" />
                    <button className="w-6 h-6 rounded-full bg-gray-400 border border-gray-300" title="Silver" />
                    <button className="w-6 h-6 rounded-full bg-white border border-gray-300" title="White" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="flex-1">
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12`}>
                {products.map((item, key) => (
                  <SingleGridItem item={item} key={key} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopWithSidebar;