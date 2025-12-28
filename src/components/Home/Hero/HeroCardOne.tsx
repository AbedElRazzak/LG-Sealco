"use client";

interface HeroCard {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
}

export default function HeroCardOne({
  title,
  subtitle,
  buttonText,
  description,
  image,
}: HeroCard) {
  return (
    <section className="relative w-full h-full ah-[85vh] amd:h-[80vh] min-h-[500px] md:min-h-[600px] 2xl:min-h-[800px] bg-[#F8F8F8] overflow-hidden flex flex-col md:flex-row items-center">
      {/* MOBILE: Image occupies the top or bottom half (stacked).
          DESKTOP: Image is pinned to the right.
      */}
      <div
        className="absolute inset-0 z-0 w-full h-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto bg-no-repeat 
                   bg-[center_bottom_0%] bg-[length:100%] 
                  md:bg-bottom transition-all duration-700 p-4"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* CONTENT LAYER:
          Added 'pt-12 md:pt-0' and 'justify-start md:justify-center' 
          to push text to the top on mobile so it doesn't overlap the centered image.
      */}
      <div className="relative z-10 w-full max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-6 xl:px-0 h-full flex flex-col justify-start pt-16 md:pt-0 md:justify-center">
        <div className="px-4 w-full md:max-w-[550px] lg:max-w-[650px] text-center md:text-left flex flex-col items-center md:items-start">
          {/* Subtitle - Thinner stroke (LG Style) */}
          <span className="block text-[#000000] sm:leading-[24px] font-semibold text-xl sm:text-4xl axl:text-6xl">
            {subtitle}
          </span>

          {/* Title - Heavy stroke */}
          <h1 className="block text-[#000000] font-bold text-xl sm:text-6xl mb-3">
            {title}
          </h1>

          {/* Description - Lighter Black (Using opacity or gray-600) */}
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
