"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";

import "swiper/css/navigation";
import "swiper/css";

import data from "./RecomendationsData";
import RecomendationCard from "./RecomendationCard";

export default function Recomendations() {
  const sliderRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) sliderRef.current.swiper.init();
  }, []);

  // ⭐ Smoother progress tracking (high sensitivity)
  const handleFullProgress = (swiper: any) => {
    // swiper.progress = 0 → 1 smoothly, even while dragging
    let p = swiper.progress * 100;

    // clamp
    p = Math.min(Math.max(p, 0), 100);

    setProgress(p);
  };

  return (
    <div className="swiper categories-carousel common-carousel max-w-[1200px] 2xl:max-w-[90vw] mb-12">
      <div className="mb-5 mt-10 flex items-center justify-between px-8 xl:px-0">
        <h2 className="font-semibold text-xl xl:text-heading-5 text-[#000000]">
          Recommended for you
        </h2>
      </div>

      <Swiper
        ref={sliderRef}
        onProgress={handleFullProgress}   // 🔥 sensitive progress
        slidesPerView={6}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 2 },
          1000: { slidesPerView: 4 },
          1200: { slidesPerView: 6 },
        }}
      >
        {data.map((item, key) => (
          <SwiperSlide key={key} className="min-w-[300px]">
            <RecomendationCard
              image={item.img}
              price={item.price}
              discount={item.discount}
              oldPrice={item.oldPrice}
              title={item.title}
              description={item.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --------- PROGRESS BAR + BUTTONS ---------- */}
      <div className="flex items-center justify-center gap-3 mt-18">
        {/* Progress Bar */}
        <div className="relative w-full h-[2px] bg-[#E8E8E8] rounded max-w-[400px]">
          <div
            className="absolute left-0 top-0 h-full bg-[#116DB2] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* NAV BUTTONS */}
        <div className="flex gap-2 hidden lg:flex flex-row justify center items-center">
          <button onClick={handlePrev} className="swiper-button-prev hidden lg:block">
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
              />
            </svg>
          </button>

          <button onClick={handleNext} className="swiper-button-next hidden lg:block">
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}