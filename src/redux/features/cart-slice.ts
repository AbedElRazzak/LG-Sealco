import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, discountedPrice, imgs } =
        action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          discountedPrice,
          quantity,
          imgs,
        });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },

    /** ✅ FIXED: used when loading cart from API */
/** ✅ FIXED: Clears local state and uses server items as source of truth */
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      const serverItems = action.payload;
      
      // Use a Map to ensure unique IDs and consistent data types
      const itemMap = new Map<number, CartItem>();

      serverItems.forEach(item => {
        // Ensure the ID is a number to prevent duplicate keys in the Map
        const cleanId = Number(item.id);
        
        itemMap.set(cleanId, {
          ...item,
          id: cleanId,
          quantity: Number(item.quantity),
          price: Number(item.price),
          discountedPrice: Number(item.discountedPrice),
        });
      });

      // Update state with the unique, cleaned array
      state.items = Array.from(itemMap.values());
    },

  },
});

/* =======================
   SELECTORS
======================= */

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
);

/* =======================
   EXPORTS
======================= */

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  setCartItems,
} = cart.actions;

export default cart.reducer;
