// file: categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetCategories } from "../api/category";

// Tạo async thunk để gọi API và lấy dữ liệu category từ server
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const response = await apiGetCategories();

  return response;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
