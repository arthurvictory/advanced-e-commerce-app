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

//added functionality to cart actions in the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Adds item to cart functionality
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      saveToSession("cart", state.items);
    },
    //removes from the cart functionality
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToSession("cart", state.items);
    },
    //Updates the cart functionality
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
        //Saves the cart to be referred to when looking at cart page
        saveToSession('cart', state.items)
      },
      //empties the cart completely
    clearCart(state) {
      state.items = [];
      saveToSession("cart", []);
    },
  },
});


//These exports empties the cart if the "-" button is pressed and it reaches 0 quantity
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce((total, item ) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
