"use client";
import React from "react";
import Image from "next/image";
import BreadcrumbFour from "../Common/BreadcrumbFour";
import Link from "next/link";

// Data structure based on the design
const highlightsData = [
  {
    id: 1,
    title: "LG shows off the new smart TVs",
    date: "November 30, 2025",
    description:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.",
    extraText:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house.",
    image: "/images/highlights/01.avif", // Update with your actual image paths
  },
  {
    id: 2,
    title: "LG shows off the new smart TVs",
    date: "November 30, 2025",
    description:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.",
    extraText:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house.",
    image: "/images/highlights/01.avif",
  },
  {
    id: 3,
    title: "LG shows off the new smart TVs",
    date: "November 30, 2025",
    description:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house, LG's stylish & innovative appliances are built to suit your lifestyle. Learn more below.",
    extraText:
      "Make the most out of life. Whether you're replacing a kitchen appliance, upgrading your laundry or furnishing your whole house.",
    image: "/images/highlights/01.avif",
  },
];

const SingleHighlight = ({ item }: { item: (typeof highlightsData)[0] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start py-12 last:border-0">
      <div className="w-full md:w-[40%] shrink-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start text-start">
        {/* REDIRECT: Wrapped title in Next.js Link */}
        <Link 
          href={`/highlights/${item.id}`} 
          className="text-xl font-bold text-[#000000] mb-1 hover:text-[#116DB2] transition-colors"
        >
          {item.title}
        </Link>
        <p className="text-xs font-medium text-gray-400 mb-4">{item.date}</p>
        <div className="w-12 h-[2px] bg-[#116DB2] mb-6"></div>
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-800 leading-relaxed">{item.description}</p>
          <p className="text-sm font-medium text-gray-800 leading-relaxed">{item.extraText}</p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-1 pt-0">
        {[
          { id: "link", src: "/images/social/linkedin.png", alt: "linkedin" },
          { id: "in", src: "/images/social/insta.png", alt: "instagram" },
          { id: "x", src: "/images/social/x.png", alt: "x" },
          { id: "p", src: "/images/social/pinterest.png", alt: "pinterest" },
          { id: "f", src: "/images/social/facebook.png", alt: "facebook" },
        ].map((social) => (
          <a key={social.id} href="#" className="w-8 h-8 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
            <Image src={social.src} alt={social.alt} width={33} height={33} className="object-contain p-1.5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function Heighlights() {
  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbFour title={"Heighlights"} pages={["Heighlights"]} />
      <section className="py-12 lg:py-20">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4">
          <div className="flex flex-col">
            {highlightsData.map((item) => (
              <SingleHighlight key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
