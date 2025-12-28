import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lastSegment = slug[slug.length - 1];
  
  const categoryName = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${categoryName} | LG Sealco`,
  };
}

const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const fullSlugPath = `category/${slug.join("/")}`;

  console.log("Looking for slug in DB:", fullSlugPath);

  

  return (
    <main>
      <ShopWithSidebar slug={fullSlugPath}/>
    </main>
  );
};

export default CategoriesPage;