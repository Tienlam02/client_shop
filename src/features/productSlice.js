import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../api/product";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (param) => {
    const response = await apiGetProducts(param);
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalRows: 0,
    page: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalRows = action.payload.count;
        state.page = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
