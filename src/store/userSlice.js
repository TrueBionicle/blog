import { createSlice } from "@reduxjs/toolkit";
import { registration, signIn, checkAuth } from "./userAsyncThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    errorMessage: 0,
    registrationMessage: null,
    login: false,
    username: null,
    email: null,
    image: null,
  },
  reducers: {},
  extraReducers: {
    [registration.pending]: (state) => {
      state.loading = true;
    },
    [registration.rejected]: (state, error) => {
      state.registrationMessage = error.error.message;
      state.error = true;
    },
    [registration.fulfilled]: (state) => {
      state.registrationMessage = "created";
      state.error = false;
    },
    [signIn.rejected]: (state) => {
      state.errorMessage += 1;
    },
    [signIn.fulfilled]: (state) => {
      state.errorMessage = false;

      state.login = true;
    },
    [checkAuth.rejected]: (state, action) => {
      state.login = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      return (state = {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
        login: true,
      });
    },
  },
});

export default userSlice.reducer;
