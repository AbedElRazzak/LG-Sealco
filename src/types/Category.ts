export type Category = {
  title: string;
  id: number;
  img: string;
};

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  thumbnailImageUrl: string;
}

export interface CategoryDetails {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  metaTitle: string | null;
  metaKeywords: string | null;
  metaDescription: string | null;
  displayOrder: number;
  parentId: number | null;
  includeInMenu: boolean;
  isPublished: boolean;
  thumbnailImageUrl: string;
  subCategories: SubCategory[]; // The nested array we just added in C#
}

export interface CategoryProduct {
  id: number;
  productId: number;
  productName: string;
  slug: string;
  isFeaturedProduct: boolean;
  displayOrder: number;
  isProductPublished: boolean;
  price: number;
  oldPrice: number | null;
  description: string | null;
  specification: string | null;
  stockQuantity: number;
  reviewsCount: number;
  thumbnailImageUrl: string;
}

export interface CategoryProductResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: CategoryProduct[];
}