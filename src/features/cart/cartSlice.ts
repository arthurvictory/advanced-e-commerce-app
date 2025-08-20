// features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/type";
import { saveToSession, loadFromSession } from "../../utilities/sessionStorage";
import type { RootState } from "../../app/store";

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
      state, action: PayloadAction<{ id: number; quantity: number }>) {
        const { id, quantity } = action.payload;
        if (quantity <= 0) {
          //Remove the item from the cart
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          const item = state.items.find((i) => i.id === id);
          if(item) {
            item.quantity = quantity;
          }
        }

        saveToSession('cart', state.items)
      },

    clearCart(state) {
      state.items = [];
      saveToSession("cart", []);
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce((total, item ) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
