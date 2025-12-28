export type Product = {
  id: number;           // This is the item/variation ID
  productId: number;    // This is the main product ID for API calls
  productName: string;
  title: string;        // Fallback for UI
  price: number;
  oldPrice: number | null;
  discountedPrice: number;
  thumbnailImageUrl: string;
  slug: string;
  description: string | null;
  reviews: number;
  imgs: {
    thumbnails: string[];
    previews: string[];
  };
};