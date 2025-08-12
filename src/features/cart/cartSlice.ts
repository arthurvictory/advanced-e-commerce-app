// features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/type";
import { saveToSession, loadFromSession } from "../../utilities/sessionStorage";

const initialCart = loadFromSession<CartItem[]>("cart") || [];

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: initialCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      saveToSession("cart", state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToSession("cart", state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveToSession("cart", state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      saveToSession("cart", []);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
