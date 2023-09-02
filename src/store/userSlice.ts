import { createSlice } from "@reduxjs/toolkit";
import {
  registration,
  signIn,
  checkAuth,
  updateProfile,
} from "./userAsyncThunk";
type UserState = {
  errorMessage: number;
  registrationMessage: string | undefined;
  userLoading: boolean;
  login: boolean;
  username: string;
  email: string;
  image: string;
  error: boolean;
};
const initialState: UserState = {
  errorMessage: 0,
  registrationMessage: "",
  userLoading: false,
  login: false,
  username: "",
  email: "",
  image: "",
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(registration.rejected, (state, error) => {
        state.registrationMessage = error.error.message;
        state.error = true;
        state.userLoading = false;
      })
      .addCase(registration.fulfilled, (state) => {
        state.registrationMessage = "created";
        state.error = false;
        state.userLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.errorMessage += 1;
        state.userLoading = false;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.errorMessage = 0;
        state.userLoading = false;
        state.login = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.login = false;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        return (state = {
          ...state,
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image,
          login: true,
        });
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log(action);
        state.login = false;
      });
  },
});

export default userSlice.reducer;
