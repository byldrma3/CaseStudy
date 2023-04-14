import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

const initialState = {
  products: [] as Product[],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity++;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
      state.totalPrice += product.price;
    },
    removeFromCart: (state, action) => {
      const hardDelete = action.payload.type;
      if (hardDelete === "hard") {
        const productId = action.payload.id;
        const existingProductIndex = state.products.findIndex(
          (p) => p.id === productId
        );
        if (existingProductIndex !== -1) {
          const existingProduct = state.products[existingProductIndex];
          state.products.splice(existingProductIndex, 1);
          state.totalPrice -= existingProduct.price * existingProduct.quantity;
        }
        return;
      }
      const productId = action.payload;
      const existingProduct = state.products.find((p) => p.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          state.products = state.products.filter((p) => p.id !== productId);
        }
        state.totalPrice -= existingProduct.price;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
