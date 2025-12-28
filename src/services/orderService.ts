import { rootClient } from "./apiClient";
import { OrderDetailVm } from "@/types/order";

export const orderService = {
  /**
   * Retrieves full order details by ID. 
   * Backend will verify ownership via the JWT token.
   */
  getOrderDetails: async (orderId: string | number, userToken: string): Promise<OrderDetailVm> => {
    try {
      const response = await rootClient.get<OrderDetailVm>(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Order Fetch Error:", error.response?.data || error.message);
      throw error;
    }
  },
};