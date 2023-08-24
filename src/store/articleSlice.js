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
    articleRequestStatus: false,
    currentArticle: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getArticles.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getArticles.pending]: (state, action) => {
      state.articleRequestStatus = "pending";
      state.loading = true;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = "fulfilled";
      state.loading = false;
    },
    [getArticleBySlug.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getArticleBySlug.pending]: (state) => {
      state.loading = true;
    },
    [getArticleBySlug.fulfilled]: (state, action) => {
      state.currentArticle = action.payload.article;
      state.loading = false;
      state.error = false;
    },

    [createArticle.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [createArticle.pending]: (state) => {
      state.loading = true;
    },
    [createArticle.fulfilled]: (state) => {
      state.articlesCount += 1;
      state.error = false;
      state.loading = false;
    },
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
