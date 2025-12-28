"use client";
import React, { useEffect, useState } from "react";
import BreadcrumbTwo from "../Common/BreadcrumbTwo";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";
import ProductDetails from "./tabs/ProductDetails";
import { cartService } from "@/services/cartService";
import { apiClient } from "@/services/apiClient";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const ShopDetails = () => {
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs"); // Default to specs to match LG focus
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedWeight, setSelectedWeight] = useState("673 L");
  const productFromStorage = useAppSelector(
    (state) => state.productDetailsReducer.value
  );
  const [product, setProduct] = useState(productFromStorage);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    // 1. Prepare standardized values
    // Use Number() to ensure ID matching works perfectly in the Redux Map/Find logic
    const cleanId = Number(product.productId);
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${product.thumbnailImageUrl}`;

    // 2. Prepare the Redux payload
    // MUST match the structure used in CartInitializer/setCartItems
    const reduxPayload = {
      id: cleanId, // Redux slice uses 'id' for calculations and uniqueness
      title: product.productName,
      itemId: product.id,
      price: Number(product.price || product.oldPrice || 0),
      discountedPrice: Number(product.price || 0),
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
          variationName: product.productName,
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
      } catch (err) {
        console.error("Error adding item to server-side cart:", err);
        // Optional: rollback Redux if the server fails
      }
    }
  };

  useEffect(() => {
    const alreadyExist = localStorage.getItem("productDetails");
    console.log("here: ", alreadyExist);
    if (alreadyExist) {
      setProduct(JSON.parse(alreadyExist));
    }
  }, []);

  if (!product)
    return <div className="py-20 text-center">Loading product...</div>;

  return (
    <>
      <BreadcrumbTwo title={"Shop Details"} pages={["shop", "details"]} />

      <section className="overflow-hidden relative pb-20 pt-10 lg:pt-16 bg-white">
        <div className="max-w-[1200px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* HEADER UTILITY ICONS: Moved to top right of content grid */}
          <div className="flex justify-end items-center gap-4 mb-6">
            <span className="text-sm font-bold text-gray-800">(0)</span>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-black transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
            {/* LEFT SIDE: Image Gallery */}
            <div className="lg:w-[55%] w-full">
              <div className="relative aspect-square border border-[#EEEEEE] bg-[#FDFDFD] flex items-center justify-center p-10 overflow-hidden group">
                <Image
                  src={
                     `${process.env.NEXT_PUBLIC_BASE_URL}/user-content/no-image.png`
                  }
                  alt={product.title}
                  width={600}
                  height={600}
                  priority
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                {product.imgs?.thumbnails.map((item: string, key: number) => (
                  <button
                    key={key}
                    onClick={() => setPreviewImg(key)}
                    className={`min-w-[80px] h-[80px] border-2 transition-all p-1 bg-white ${key === previewImg ? "border-[#116DB2]" : "border-[#EEEEEE]"}`}
                  >
                    <Image
                      width={80}
                      height={80}
                      src={item}
                      alt="thumb"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
                <div className="min-w-[80px] h-[80px] border border-[#EEEEEE] flex items-center justify-center text-sm font-bold text-gray-800 bg-white">
                  +4 more
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Content */}
            <div className="lg:w-[45%] w-full flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                {product.title}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-gray-200"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1 font-bold">
                    (0)
                  </span>
                </div>
                <button className="text-[#116DB2] text-sm font-bold pb-0.5">
                  Write a review
                </button>
              </div>

              {/* Key Features */}
              <div className="border-t border-[#EEEEEE] py-6 relative">
                <h3 className="font-bold text-lg mb-4">Key Features</h3>
                <button className="absolute right-0 top-6 text-xl font-light text-gray-400">
                  −
                </button>
                <ul className="space-y-3 text-gray-600 text-sm font-medium">
                  <li>InstaView Door-in-Door™</li>
                  <li>Hygiene FRESH+™</li>
                  <li>Linear compressor</li>
                  <li>Smart storage system</li>
                </ul>
              </div>

              {/* COLOR SELECTOR */}
              <div className="border-t border-[#EEEEEE] py-6 relative">
                <h3 className="font-bold text-lg mb-2">Choose your color</h3>
                <p className="text-xs font-bold text-gray-800 mb-3">
                  Color: {selectedColor}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedColor("Black")}
                    className={`w-8 h-8 rounded-full border p-0.5 ${selectedColor === "Black" ? "border-gray-800" : "border-transparent"}`}
                  >
                    <div className="w-full h-full rounded-full bg-black"></div>
                  </button>
                  <button
                    onClick={() => setSelectedColor("Silver")}
                    className={`w-8 h-8 rounded-full border p-0.5 ${selectedColor === "Silver" ? "border-gray-800" : "border-transparent"}`}
                  >
                    <div className="w-full h-full rounded-full bg-gray-300 border border-gray-100"></div>
                  </button>
                </div>
              </div>

              {/* WEIGHT SELECTOR */}
              <div className="border-t border-[#EEEEEE] py-6 relative">
                <h3 className="font-bold text-lg mb-4">Choose your weight</h3>
                <button
                  className={`px-6 py-2 rounded-full border font-bold text-sm ${selectedWeight === "673 L" ? "bg-white border-gray-400 text-gray-900" : "bg-gray-50 border-transparent text-gray-400"}`}
                >
                  673 L
                </button>
              </div>

              {/* PRICE */}
              <div className="flex items-baseline gap-2 mb-8 pt-6">
                <span className="text-4xl font-bold text-black">
                  {product.discountedPrice}$
                </span>
                <span className="text-xs font-bold text-black uppercase">
                  TTC
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  {/* QUANTITY COUNTER (Rectangle Design) */}
                  <div className="flex items-center h-12 bg-white">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="w-10 h-full border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={quantity}
                      className="w-16 h-full border-y border-gray-200 text-center font-bold text-gray-900 outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full text-center font-bold text-white text-sm rounded-full bg-[#116DB2] py-3 px-10 hover:bg-[#AD003A] transition-all duration-300"
                  >
                    Add To Cart
                  </button>
                </div>
                <button
                  className="w-full text-center font-bold text-sm rounded-full 
                  bg-white text-gray-800 border border-gray-300
                  py-3 px-10
                  hover:bg-[#116DB2] hover:text-white hover:border-[#116DB2]
                  transition-all duration-300"
                >
                  Where To Buy
                </button>
                <button
                  className="w-full text-center font-bold text-sm rounded-full 
                  bg-white text-gray-800 border border-gray-300
                  py-3 px-10
                  hover:bg-[#116DB2] hover:text-white hover:border-[#116DB2]
                  transition-all duration-300 flex items-center justify-center gap-2 mt-2 uppercase"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#116DB2] hover:text-[#AD003A]"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetails />

      {/* <RecentlyViewdItems />
      <Newsletter /> */}
    </>
  );
};

export default ShopDetails;
