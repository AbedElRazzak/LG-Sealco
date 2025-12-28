"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { CategoryProduct } from "@/types/Category";
import { cartService } from "@/services/cartService";
import { apiClient } from "@/services/apiClient";

const SingleGridItem = ({ item }: { item: CategoryProduct }) => {
  const { openModal } = useModalContext();
  const { openCartModal } = useCartModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleSetProductDetails = () => {
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`;

    const productDetails = {
      id: item.id,
      productId: item.productId,
      thumnailIamgeUrl: item.thumbnailImageUrl,
      title: item.productName,
      price: item.price,
      oldPrice: item.oldPrice,
      discountedPrice: item.price,
      reviews: item.reviewsCount || 0,
      imgs: {
        thumbnails: [imageUrl],
        previews: [imageUrl],
      },
      slug: item.slug,
      description: item.description,
    };

    localStorage.setItem("productDetails", JSON.stringify(productDetails));

    // Also update Redux if you are using it as a backup
    dispatch(updateQuickView(productDetails));
  };

  const handleQuickViewUpdate = () => {
    dispatch(
      updateQuickView({
        id: item.id,
        title: item.productName,
        price: item.oldPrice || item.price,
        discountedPrice: item.price,
        reviews: item.reviewsCount,
        img: `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`, // Main image string
        images: [
          `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`,
        ], // Fallback array
        imgs: {
          thumbnails: [
            `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`,
          ],
          previews: [
            `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`,
          ],
        },
        // If your Product type requires these from the item:
        slug: item.slug,
        description: item.description,
      })
    );
  };

  const handleAddToCart = async () => {
    // 1. Prepare standardized values
    // Use Number() to ensure ID matching works perfectly in the Redux Map/Find logic
    const cleanId = Number(item.productId);
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`;

    // 2. Prepare the Redux payload
    // MUST match the structure used in CartInitializer/setCartItems
    const reduxPayload = {
      id: cleanId, // Redux slice uses 'id' for calculations and uniqueness
      title: item.productName,
      itemId: item.id,
      price: Number(item.price || item.oldPrice || 0),
      discountedPrice: Number(item.price || 0),
      quantity: 1,
      imgs: {
        thumbnails: [imageUrl],
        previews: [imageUrl],
      },
    };

    // 3. Update Redux immediately (Optimistic Update)
    dispatch(addItemToCart(reduxPayload));

    // 4. Open the modal immediately so the user sees the change
    // openCartModal();

    const userToken = localStorage.getItem("userToken");
    console.log("userToken: ", userToken);

    if (userToken) {
      const customerIdStr = localStorage.getItem("customerId");
      const customerId = customerIdStr ? parseInt(customerIdStr, 10) : null;

      if (!customerId) return;

      try {
        const apiPayload = {
          productId: cleanId,
          variationName: item.productName,
          quantity: 1,
        };

        await apiClient.post(
          `/customers/${customerId}/add-cart-item`,
          apiPayload,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        // ✅ DO NOT call fetchServerCart here.
        // Since we updated Redux optimistically with the correct ID and structure,
        // the local state is already correct.
        console.log("Item synced with server");
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Use 'smooth' for a nice animation or 'auto' for instant jump
        });
        openCartModal();
      } catch (err) {
        console.error("Error adding item to server-side cart:", err);
        // Optional: rollback Redux if the server fails
      }
    }
  };
  const discountPercent = Math.round(
    ((item.price - item.oldPrice) / item.price) * 100
  );

  return (
    <div className="group w-full bg-white flex flex-col items-start text-start">
      {/* Image Container with LG-style border and padding */}
      <div className="relative w-full aspect-square flex items-center justify-center mb-4 border border-[#E8E8E8] p-8 bg-[#FDFDFD] overflow-hidden">
        {/* TOP RIGHT ICONS: Wishlist and Share */}
        <div className="absolute top-2 right-2 flex items-center gap-2 z-20">
          <button
            className="text-gray-400 hover:text-[#AD003A] transition-colors"
            aria-label="Add to wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="Share product"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>

        {/* Discount Badge - Positioned slightly lower to avoid icons */}
        {discountPercent > 0 && (
          <span className="absolute top-25 right-0 bg-[#116DB2] text-white text-sm font-bold py-1 px-3">
            SALE
          </span>
        )}

        {/* Product Image */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnailImageUrl}`}
            unoptimized
            alt={item.productName}
            fill
            className="object-contain"
          />
        </div>

        {/* Hover Actions (Quick View) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            className="bg-white text-black text-xs font-bold py-2 px-4 shadow-md uppercase tracking-wider hover:bg-[#116DB2] hover:text-white transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-bold text-black mb-1 line-clamp-2 min-h-[40px] leading-tight">
        <Link
          href="/shop-details"
          onClick={handleSetProductDetails}
          className="hover:text-[#116DB2] transition-colors text-lg font-bold text-[#000000]"
        >
          {item.productName}
        </Link>
      </h3>

      {/* Meta Info */}
      {/* <p className="text-[12px] text-gray-500 mb-2 font-medium uppercase tracking-wider">
        {item.category && item.category.length > 0
          ? item.category[0]
          : "General"}{" "}
        | {item.reviews} Reviews
      </p> */}

      {/* Pricing section */}
      <div className="flex flex-col items-start mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-[#000000]">
            {item.price}$
          </span>
          <span className="text-[10px] font-bold text-[#000000] uppercase self-baseline translate-y-[1px]">
            TTC
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full grid grid-cols-1 gap-2">
        <button
          onClick={handleAddToCart}
          className="w-full text-center font-bold text-white text-sm rounded-full bg-[#116DB2] py-3 px-10 hover:bg-[#AD003A] transition-all duration-300"
        >
          Add to Cart
        </button>
        <button className="w-full text-center font-bold text-[#000000] text-sm rounded-full bg-[#ffffff] border border-[#E2E2E2] py-3 px-10 hover:bg-[#AD003A] hover:text-[#ffffff] transition-all duration-300">
          Where to Buy
        </button>
      </div>
    </div>
  );
};

export default SingleGridItem;
