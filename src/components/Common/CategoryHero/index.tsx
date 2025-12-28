// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css/pagination";
// import "swiper/css";

// import Image from "next/image";

// const HeroCarousal = () => {
//   return (
//     <Swiper
//       spaceBetween={30}
//       centeredSlides={true}
//       // autoplay={{
//       //   delay: 2500,
//       //   disableOnInteraction: false,
//       // }}
//       pagination={{
//         clickable: true,
//       }}
//       modules={[Autoplay, Pagination]}
//       className="hero-carousel"
//     >
//       <SwiperSlide>
//         <div
//           className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row"
//           style={{
//             backgroundImage: 'url("/images/hero/main-01.png")',
//             backgroundSize: "cover",
//             // backgroundPosition: "bottom right",
//           }}
//         >
//           <div className="w-[100%] ah-[100vh] amax-w-[394px] py-10 sm:py-15 lg:py-24.5 apl-4 asm:pl-7.5 alg:pl-12.5">
//             <div className="flex items-center agap-4 mb-2 asm:mb-10">
//               {/* <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
//                 30%
//               </span> */}
//               <span className="block text-[#000000] atext-sm asm:text-custom-1 sm:leading-[24px] font-semibold text-xl sm:text-5xl">
//                 Shop in a
//                 <br />
//                 {/* Off */}
//               </span>
//             </div>

//             <h1 className="font-bold text-[#000000] text-xl sm:text-6xl mb-5">
//               <a href="#">New Reality</a>
//             </h1>

//             <p className="sm:text-2xl text-[#000000] font-medium">
//               Visit our virtual showroom now
//             </p>

//             <a
//               href="#"
//               className="inline-flex font-medium text-white text-custom-sm rounded-3xl bg-[#116DB2] py-3 px-9 ease-out duration-200 hover:bg-[#AD003A] mt-5"
//             >
//               Learn more
//             </a>
//           </div>

//           {/* <div>
//             <Image
//               src="/images/hero/main-01.png"
//               alt="headphone"
//               width={351}
//               height={358}
//             />
//           </div> */}
//         </div>
//       </SwiperSlide>
//       <SwiperSlide>
//         {" "}
//         <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
//           <div className="w-[100%] h-[100vh] amax-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
//             <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
//               <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
//                 30%
//               </span>
//               <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
//                 Sale
//                 <br />
//                 Off
//               </span>
//             </div>

//             <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
//               <a href="#">True Wireless Noise Cancelling Headphone</a>
//             </h1>

//             <p>
//               Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
//               nec suscipit.
//             </p>

//             <a
//               href="#"
//               className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
//             >
//               Shop Now
//             </a>
//           </div>

//           <div>
//             <Image
//               src="/images/hero/hero-01.png"
//               alt="headphone"
//               width={351}
//               height={358}
//             />
//           </div>
//         </div>
//       </SwiperSlide>
//     </Swiper>
//   );
// };
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CategoryHeroCard from "./CategoryHeroCard";
const CategoryHero = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel ah-115"
    >
      {" "}
      {/* SLIDE 1 */}{" "}
      <SwiperSlide>
        {" "}
        <CategoryHeroCard
          // title="New Reality"
          // buttonText="Learn more"
          // description="Visit our virtual showroom now"
          image="/images/categories/category-banner.jpg"
        />{" "}
      </SwiperSlide>{" "}
      {/* SLIDE 2 */}{" "}
      <SwiperSlide>
        {" "}
        <CategoryHeroCard
          // title="New Reality"
          // buttonText="Learn more"
          // description="Visit our virtual showroom now"
          image="/images/categories/category-banner.jpg"
        />{" "}
      </SwiperSlide>{" "}
      <div className="swiper-pagination !bottom-5"></div>
    </Swiper>
  );
};
export default CategoryHero;
