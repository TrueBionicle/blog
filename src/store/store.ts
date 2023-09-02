import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleSlice.ts";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    articles: articleSlice,
    user: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
