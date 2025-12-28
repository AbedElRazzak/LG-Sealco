"use client";

import Image from "next/image";

interface SubItem {
  title: string;
  description: string;
}

interface Feature {
  img: string;
  title: string;
  items: SubItem[];
}

interface CtaThreeProps {
  title: string;
  features: Feature[];
  paragraphs: String[];
}

export default function CtaThree({ title, features, paragraphs }: CtaThreeProps) {
  return (
    <section className="bg-[#FFFFFF] pt-16 px-6 pb-6">
      <div className="max-w-[1200px] 2xl:max-w-[1600px] mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-[#000000] mb-12 text-start">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start text-start"
            >
              {/* Image */}
              <div className="h-[7rem] flex flex-col items-start justify-center mb-4">
                <Image
                  src={feature.img}
                  alt="Feature icon"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="font-bold text-xl text-[#000000] mb-4">{feature.title}</h3>

              {/* Items (title + description) */}
              <div className="space-y-4">
                {feature.items.map((sub, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-sm text-[#000000] uppercase mb-1">
                      {sub.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Paragraph */}
        <p className="text-gray-700 text-base leading-relaxed mt-12">
          {paragraphs.map((p, idx) => (
            <div key={idx} className="pb-6">
                <p className="text-gray-700 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </p>
      </div>
    </section>
  );
}
