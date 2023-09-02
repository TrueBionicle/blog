import { createSlice } from "@reduxjs/toolkit";

import {
  getArticles,
  getArticleBySlug,
  createArticle,
} from "./articleAsyncThunk.ts";

type ArticleState = {
  articles: [];
  articlesCount: number;
  loading: boolean;
  articleRequestStatus: boolean | string;
  currentArticle: any;
  error: boolean;
};

const initialState: ArticleState = {
  articles: [],
  articlesCount: 0,
  loading: false,
  articleRequestStatus: false,
  currentArticle: null,
  error: false,
};

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getArticles.pending, (state) => {
        state.articleRequestStatus = "pending";
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.articleRequestStatus = "fulfilled";
        state.loading = false;
      })
      .addCase(getArticleBySlug.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getArticleBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleBySlug.fulfilled, (state, action) => {
        state.currentArticle = action.payload.article;
        state.loading = false;
        state.error = false;
      })
      .addCase(createArticle.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.articlesCount += 1;
        state.error = false;
        state.loading = false;
      });
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
