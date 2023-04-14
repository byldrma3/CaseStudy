import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

const initialState = {
  favoriteProducts: [] as Product[],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.favoriteProducts.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex === -1) {
        state.favoriteProducts.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      const existingProductIndex = state.favoriteProducts.findIndex(
        (p) => p.id === productId
      );
      if (existingProductIndex !== -1) {
        state.favoriteProducts.splice(existingProductIndex, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
