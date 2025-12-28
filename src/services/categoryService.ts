import { apiClient } from './apiClient';
import { CategoryDetails, CategoryProductResponse } from '../types/Category';

/**
 * Service to handle Category-related APIs
 */
export const categoryService = {
  /**
   * Fetches a single category and its sub-categories by its full slug path
   * GET /api/categories/by-slug?slug=category/path/here
   */
  getCategoryBySlug: async (slug: string): Promise<CategoryDetails> => {
    try {
      const response = await apiClient.get<CategoryDetails>('/categories/by-slug', {
        params: { slug } // Axios will encode "category/christmas-offers" correctly
      });
      return response.data;
    } catch (error: any) {
      console.error(`Get Category By Slug (${slug}) Error:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetches products belonging to a specific category (and its sub-categories)
   * GET /api/categories/{id}/products?page=1&pageSize=10
   */
  getProductsByCategoryId: async (
    id: number, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<CategoryProductResponse> => {
    try {
      const response = await apiClient.get<CategoryProductResponse>(
        `/categories/${id}/products`, 
        {
          params: { page, pageSize }
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(`Get Products for Category ${id} Error:`, error.response?.data || error.message);
      throw error;
    }
  }
};