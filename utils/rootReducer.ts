import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartReducer";
import favoritesSlice from "./favoritesReducer";

const rootReducer = combineReducers({
  cart: cartSlice,
  favorites: favoritesSlice,
});

export default rootReducer;
