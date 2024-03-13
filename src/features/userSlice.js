import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, acction) => {
      state.user = acction.payload.user;
      state.accessToken = acction.payload.accessToken;
    },
    updateCart: (state, acction) => {
      state.user = acction.payload;
    },
    logOut: (state, acction) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export const { login, updateCart, getCurrent, logOut } = userSlice.actions;

export default userSlice.reducer;
