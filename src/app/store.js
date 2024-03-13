import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import categorySlice, { fetchCategories } from "../features/categorySlice";
import productSlice, { fetchProducts } from "../features/productSlice";

export const store = configureStore({
  reducer: { userSlice, categorySlice, productSlice },
});

store.dispatch(fetchCategories());
store.dispatch(fetchProducts());
