import { apiClient } from './apiClient';
import { MenuListItem, MenuDetails } from '../types/Menu';

/**
 * Service to handle menu header-related APIs
 */
export const menuService = {
  /**
   * Gets the list of all menus (Customer Services, Information, Main Menu, etc.)
   * GET /api/menus
   */
  getMenus: async (): Promise<MenuListItem[]> => {
    try {
      const response = await apiClient.get<MenuListItem[]>('/menus');
      return response.data;
    } catch (error: any) {
      console.error("Get Menus API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  getMenuById: async (id: number): Promise<MenuDetails> => {
    try {
      const response = await apiClient.get<MenuDetails>(`/menus/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Get Menu By ID (${id}) Error:`, error.response?.data || error.message);
      throw error;
    }
  }

};