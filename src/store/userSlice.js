import { createSlice } from "@reduxjs/toolkit";
import {
  registration,
  signIn,
  checkAuth,
  updateProfile,
} from "./userAsyncThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    stateMessage: null,
    isLogged: false,
    login: false,
    username: null,
    email: null,
    image: null,
  },
  reducers: {},
  extraReducers: {
    [registration.pending]: (state) => {
      state.stateMessage = null;
      state.loading = true;
    },
    [registration.rejected]: (state, error) => {
      state.stateMessage = error.error.message;
      state.error = true;
    },
    [registration.fulfilled]: (state) => {
      state.stateMessage = "created";
      state.error = true;
    },
    [signIn.rejected]: (state) => {
      state.isLogged = false;
    },
    [signIn.fulfilled]: (state) => {
      state.login = true;
      state.isLogged = true;
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
    [updateProfile.rejected]: (error) => [console.log(error)],
    [updateProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default userSlice.reducer;
