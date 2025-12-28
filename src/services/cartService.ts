import { apiClient } from './apiClient';
import { CartItem, AddToCartRequest, CartDetails } from '@/types/Cart';

export const cartService = {
  /**
   * Fetch customer cart
   * GET /api/customers/{customerId}/cart
   */
  getCartByCustomerId: async (
    customerId: number,
    userToken: string
  ): Promise<CartDetails> => {
    try {
      const response = await apiClient.get<CartDetails>(
        `/customers/${customerId}/cart`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(
        `Get Cart for Customer ${customerId} Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },


  /**
   * Add product to cart
   * POST /api/customers/{customerId}/add-cart-item
   */
  addToCartByCustomerId: async (
    customerId: number,
    payload: AddToCartRequest
  ): Promise<void> => {
    try {
      await apiClient.post(
        `/customers/${customerId}/add-cart-item`,
        payload
      );
    } catch (error: any) {
      console.error(
        `Add To Cart for Customer ${customerId} Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Remove item from cart
   * DELETE /api/customers/{customerId}/cart-items/{itemId}
   */
  removeFromCartByCustomerId: async (
    customerId: number,
    itemId: number
  ): Promise<void> => {
    try {
      await apiClient.delete(
        `/customers/${customerId}/cart-items/${itemId}`
      );
    } catch (error: any) {
      console.error(
        `Remove Cart Item ${itemId} for Customer ${customerId} Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }
};