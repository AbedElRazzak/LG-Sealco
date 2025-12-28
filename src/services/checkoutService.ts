import { rootClient } from "./apiClient";
import {
  CheckoutRequest,
  CheckoutResponse,
  ShippingInfoResponse,
  PaymentProvider,
  UpdateTaxShippingRequest,
  UpdateTaxShippingResponse,
  District,
  SaveShippingRequest,
  SaveShippingResponse,
  OrderCompletionResponse,
} from "@/types/checkout";

export const checkoutService = {
  /**
   * Start the checkout process
   * POST /api/checkout
   * @param userToken - JWT Bearer token
   * @param payload - Optional object containing couponCode
   */
  startCheckout: async (
    userToken: string,
    payload: CheckoutRequest = {}
  ): Promise<CheckoutResponse> => {
    try {
      const response = await rootClient.post<CheckoutResponse>(
        "/checkout",
        payload, // This will send { "couponCode": "string" } or {}
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "Checkout Initialization Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getShippingInfo: async (
    checkoutId: string,
    userToken: string
  ): Promise<ShippingInfoResponse> => {
    try {
      const response = await rootClient.get<ShippingInfoResponse>(
        `/checkout/${checkoutId}/shipping`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `Get Shipping Info Error for Checkout ${checkoutId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getPaymentProviders: async (
    userToken: string
  ): Promise<PaymentProvider[]> => {
    try {
      const response = await rootClient.get<PaymentProvider[]>(
        "/payments-providers",
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Get Payment Providers Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateTaxAndShippingPrices: async (
    checkoutId: string,
    userToken: string,
    payload: UpdateTaxShippingRequest
  ): Promise<UpdateTaxShippingResponse> => {
    try {
      const response = await rootClient.post<UpdateTaxShippingResponse>(
        `/checkout/${checkoutId}/update-tax-and-shipping-prices`,
        payload,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `Update Tax/Shipping Error for Checkout ${checkoutId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getDistricts: async (
    stateId: number,
    userToken: string
  ): Promise<District[]> => {
    try {
      const response = await rootClient.get<District[]>(
        `api/states-provinces/${stateId}/districts`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `Get Districts for State ${stateId} Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  saveShippingInfo: async (
    checkoutId: string,
    userToken: string,
    payload: SaveShippingRequest
  ): Promise<SaveShippingResponse> => {
    try {
      const response = await rootClient.post<SaveShippingResponse>(
        `/checkout/${checkoutId}/shipping`,
        payload,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `Save Shipping Error for Checkout ${checkoutId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  completeOrderCoD: async (
    checkoutId: string,
    userToken: string
  ): Promise<OrderCompletionResponse> => {
    try {
      const response = await rootClient.post<OrderCompletionResponse>(
        "/api/cod/checkout",
       `"${checkoutId}"`, // SimplCommerce often expects the raw GUID string as the body
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Complete CoD Order Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
