"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SubCategory } from "@/types/Category";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface ChildCategoryCarouselProps {
  categories: SubCategory[];
}

const ChildCategoryCarousel = ({ categories }: ChildCategoryCarouselProps) => {
  return (
    <section className="bg-white pt-12">
      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-6">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={8}
          slidesPerView={1} // Default for mobile
          navigation={true}
          breakpoints={{
            // Tablet
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // Desktop
            1024: {
              slidesPerView: 6,
              spaceBetween: 8,
            },
          }}
          className="category-swiper !pb-12"
        >
          {categories?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={`/${item?.slug}`} className="group block text-center">
                {/* Image Container: Using a light gray background like LG */}
                <div className="relative aspect-square w-full bg-[#F6F6F6] rounded-sm overflow-hidden mb-4 items-center justify-center p-6 flex flex-col ">
                  <div className="relative w-full h-full transition-transform duration-500 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/user-content/no-image.png`}
                      unoptimized
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className=" font-semibold text-md md:text-sm  text-[#333] group-hover:text-[#116DB2] transition-colors">
                  {item.name}
                </h3>
                </div>
                {/* Title: Uppercase and Bold like LG Levant */}
                
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ChildCategoryCarousel;