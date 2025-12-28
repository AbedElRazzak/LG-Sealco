"use client";

interface HeroCard {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
}

export default function HeroCardTwo({
  title,
  subtitle,
  buttonText,
  description,
  image,
}: HeroCard) {
  return (
    <section className="mb-20 md:mb-10 relative w-full h-full min-h-[500px] md:min-h-[600px] 2xl:min-h-[800px] bg-[#F8F8F8] overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* BACKGROUND IMAGE LAYER 
          Matches HeroCardOne: Mobile centered at bottom, Desktop pinned to right.
      */}
      <div 
        className="absolute inset-0 z-0 w-full h-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto bg-no-repeat 
                   bg-[center_bottom_0%] bg-[length:100%] 
                   md:bg-right md:bg-bottom transition-all duration-700"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* CONTENT LAYER
          Matches the reference padding and layout to ensure text doesn't overlap 
          the image on mobile/tablet.
      */}
      <div className="relative z-10 w-full max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-6 xl:px-0 h-full flex flex-col justify-start pt-16 md:pt-0 md:justify-center">
        <div className="px-4 w-full md:max-w-[550px] lg:max-w-[500px] text-center md:text-left flex flex-col items-center md:items-start">
          
          {/* Kept your Title as the primary big text */}
          <span className="block text-[#000000] sm:leading-[45px] font-semibold text-xl sm:text-4xl axl:text-6xl">
            {title}
          </span>

          {/* Subtitle - Kept your design font-semibold text-3xl */}
          <span className="block text-[#000000] font-semibold text-xl sm:text-3xl mb-3">
            {subtitle}
          </span>

          {/* Description - Kept your font-medium text-lg */}
          <p className="text-lg text-[#000000] font-medium mb-3">
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

    </section>
  );
}