import React from "react";

type CategoryCardProps = {
  title?: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number; // optional sale percent
  productCode?: string;
};

export default function CategoryCard({
  title = "New Arrivals",
  image,
  price,
  oldPrice,
  discount,
  productCode,
}: CategoryCardProps) {
  return (
    // Main container now uses the 'group' class to enable hover effects on children
    <div className="group w-full max-w-[400px] min-w-[300px] bg-[#FDFDFD] border border-[#E8E8E8] p-0 flex flex-col items-center text-center ">
      <h2 className="text-2xl font-semibold text-[#000000] my-6 px-4">
        {title}
      </h2>

      <div className="relative w-full flex flex-col items-center px-4">
        {/* Product Image and Buy Button Wrapper */}
        {discount !== null && (
            <div className="absolute top-15 right-0 bg-[#116DB2] text-white text-xl font-bold py-1 px-3">
              -{discount}%
            </div>
          )}
        <div className="relative w-full max-w-xs flex justify-center mb-10">
          {/* Discount tag position adjusted */}
          

          {/* Image */}
          <img src={image} alt="product" className="w-52 h-52 object-contain" />

          {/* Buy button is now positioned absolutely, hidden by default (opacity-0), 
            and fades in on hover (group-hover:opacity-100).
            The 'bottom' value is chosen to place it over the lower part of the image, 
            as seen in the provided UI.
          */}
          <button className="absolute bottom-[-25px] opacity-0 group-hover:opacity-100 inline-flex font-medium text-white text-sm rounded-3xl bg-[#116DB2] py-3 px-12 hover:bg-[#AD003A] transition">
            Buy
          </button>
          
        </div>

        {/* Product Code */}
        {productCode && (
          <p className="text-lg font-medium text-gray-800 mb-1">
            {productCode}
          </p>
        )}

        {/* Price Display */}
        <div className="flex items-baseline justify-center mb-6 mt-2">
          {/* Old Price + TTC (Strikethrough) */}
          {oldPrice && (
            <div className="flex items-baseline mr-2">
              <span className="text-gray-600 line-through text-2xl font-light">
                {oldPrice}$
              </span>
              <span className="text-gray-600 line-through text-sm ml-1 font-normal uppercase">
                TTC
              </span>
            </div>
          )}

          {/* Current Price + TTC (Prominent) */}
          <div
            className={`flex items-baseline ${
              discount ? "text-[#116DB2]" : ""
            }`}
          >
            <span className="text-[#000000] text-3xl font-bold">
              {price}$
            </span>
            <span className="text-[#000000] text-xl ml-1 font-bold uppercase">
              TTC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
