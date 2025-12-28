import React from "react";
import Image from "next/image";

interface NewsletterProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

export default function Newsletter({
  title,
  description,
  buttonText,
  image,
}: NewsletterProps) {
  return (
    <section className="w-full overflow-hidden mb-20 md:mb-10 ">
      <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[300px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dark Gradient Overlay (left side only) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#272727]/80 via-20% to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] 2xl:max-w-[1600px] mx-auto w-full px-6 lg:px-0">
          <div className="max-w-[420px] text-left">
            <h2 className="text-white font-bold text-3xl sm:text-4xl leading-snug mb-4">
              {title}
            </h2>

            <p className="text-white text-base sm:text-lg mb-6">
              {description}
            </p>

            <a
            href="#"
            className="inline-flex font-bold text-white text-sm md:text-base rounded-full bg-[#116DB2] py-4 px-10 hover:bg-[#AD003A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            {buttonText}
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
