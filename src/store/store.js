import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleSlice";

export default configureStore({
  reducer: articleSlice,
});
