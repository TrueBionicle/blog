import { createSlice } from "@reduxjs/toolkit";

import {
  getArticles,
  getArticleBySlug,
  createArticle,
} from "./articleAsyncThunk";

export const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    articlesCount: 0,
    loading: false,
    state: null,
    articleRequestStatus: false,
    currentArticle: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getArticles.pending]: (state, action) => {
      state.articleRequestStatus = "pending";
    },
    [getArticles.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = "fulfilled";
      console.log(state.articleRequestStatus);
      state.loading = false;
    },
    [getArticleBySlug.pending]: (state) => {
      state.loading = true;
    },
    [getArticleBySlug.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.currentArticle = action.payload.article;
      state.loading = false;
    },
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
