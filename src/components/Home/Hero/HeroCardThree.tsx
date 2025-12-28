"use client";

interface HeroCard {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

export default function HeroCardThree({
  title,
  subtitle,
  buttonText,
  description,
  image,
  link,
}: HeroCard) {
  return (
    <div className="relative w-full h-[60vh] lg:h-[80vh] my-8 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="
          absolute inset-0
          bg-no-repeat bg-cover
          z-0
        "
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* 🔥 BLACK OVERLAY ABOVE IMAGE */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* POLYGON SHAPE */}
      <div
        className="
          absolute inset-0
          bg-[#F8F8F8]
          z-10
          [clip-path:polygon(0_30%,100%_100%,0_100%)]
          2xl:[clip-path:polygon(0_50%,100%_100%,0_100%)]
        "
      ></div>

      {/* TEXT + BUTTON */}
      <div className="absolute inset-0 z-20">
        <div className="relative max-w-[1200px] 2xl:max-w-[1600px] mx-auto h-full flex items-end xl:px-0 px-4 pb-[3%]">
          <div className="max-w-[450px]">
            <span className="block text-[#000000] sm:leading-[45px] font-semibold text-xl sm:text-4xl axl:text-6xl">
              {title}
            </span>

            <span className="block text-[#000000] font-semibold text-xl sm:text-3xl mb-3">
              {subtitle}
            </span>

            <p className="text-lg text-[#000000] font-medium mb-3">
              {description}
              <span className="text-[#116DB2]">
                <a href={`mailto:${link}`}> {link}</a>
              </span>
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
    </div>
  );
}
