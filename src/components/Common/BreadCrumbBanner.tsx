"use client";

interface BreadCrumbBannerProps {
  image: string;
}

export default function BreadCrumbBanner({ image }: BreadCrumbBannerProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] a2xl:max-w-[1600px] mx-auto overflow-hidden bg-[#F8F8F8]">
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover transition-all duration-700"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </section>
  );
}
