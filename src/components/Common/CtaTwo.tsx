"use client";

import Image from "next/image";

interface Feature {
  img: string;
  title: string;
  description: string;
}

interface CTASectionProps {
  title: string;
  features: Feature[];
}

export default function CtaTwo({ title, features }: CTASectionProps) {
  return (
    <section className="bg-[#F8F8F8] py-16 px-6">
      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-[#000000] mb-12 text-start ">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-start text-center">
              {/* Image */}
              <div className="h-[7rem] flex flex-col items-center justify-center">
                <Image
                src={item.img}
                alt={item.title}
                width={80}
                height={80}
                className=""
              />
              </div>
              

              {/* Item Title */}
              <h3 className="font-bold text-lg text-[#000000] mb-2 uppercase">
                {item.title}
              </h3>

              {/* Description */}
              <p class-name="text-gray-700 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
