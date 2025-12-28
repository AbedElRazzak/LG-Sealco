// "use client";

// interface CategoryHeroCard {
//   title: string;
//   description: string;
//   buttonText: string;
//   image: string;
// }

// export default function CategoryHeroCard({
//   title,
//   buttonText,
//   description,
//   image,
// }: CategoryHeroCard) {
//   return (
//     <section className="relative w-full h-full md:min-h-115 bg-[#F8F8F8] overflow-hidden flex flex-col md:flex-row items-center">
//       {/* MOBILE: Image occupies the top or bottom half (stacked).
//           DESKTOP: Image is pinned to the right.
//       */}
//       <div
//         className="absolute inset-0 z-0 w-full h-full  2xl:max-w-[1600px] mx-auto bg-no-repeat 
//                    bg-[center_bottom_0%] bg-[length:100%] 
//                    md:bg-cover transition-all duration-700 p-4"
//         style={{
//           backgroundImage: `url(${image})`,
//         }}
//       />

//       {/* CONTENT LAYER:
//           Added 'pt-12 md:pt-0' and 'justify-start md:justify-center' 
//           to push text to the top on mobile so it doesn't overlap the centered image.
//       */}
//       {/* <div className="relative z-10 w-full 2xl:max-w-[1600px] mx-auto px-6 xl:px-0 h-full flex flex-col justify-start pt-16 md:pt-0 md:justify-center">
//         <div className="px-24 w-full qmd:max-w-[550px] qlg:max-w-[650px] text-center md:text-left flex flex-col items-center md:items-start">

         
//           <h1 className="block text-[#ffffff] font-bold text-xl sm:text-6xl mb-3">
//             {title}
//           </h1>

//           <p className="text-lg text-[#ffffff] font-medium mb-3">
//             {description}
//           </p>

//           <a
//             href="#"
//             className="inline-flex font-bold text-white text-sm md:text-base rounded-full bg-[#116DB2] py-4 px-10 hover:bg-[#AD003A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             {buttonText}
//           </a>
//         </div>
//       </div> */}
//     </section>
//   );
// }
"use client";

interface CategoryHeroCardProps {
  image: string;
}

export default function CategoryHeroCard({ image }: CategoryHeroCardProps) {
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
