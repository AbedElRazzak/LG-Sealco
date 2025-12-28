import React from "react";

type RecomendationCardProps = {
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description?: string;
};

export default function RecomendationCard({
  title,
  image,
  price,
  oldPrice,
  discount,
  description,
}: RecomendationCardProps) {
  return (
    <div className="w-full max-w-[300px] bg-white  rounded-md p-4 flex flex-col items-start text-start">
      
      {/* Image + Discount badge */}
      <div className="relative w-full flex justify-center mb-4 border border-[#E8E8E8] p-12 bg-[#FDFDFD]">
        {discount && (
          <span className="absolute top-2 right-2 bg-[#116DB2] text-white text-sm font-bold py-1 px-2 rounded">
            -{discount}%
          </span>
        )}
        <img src={image} alt={title} className="w-52 h-52 object-contain" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-[#000000] mb-2">{title}</h2>

      {/* Price section */}
      <div className="flex flex-col items-start mb-2">
        <p className="text-2xl font-bold text-[#000000]">{price}$</p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[#000000] text-sm font-medium">{description}</p>
      )}
    </div>
  );
}
