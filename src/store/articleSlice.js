import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles,
  getArticleBySlug,
  registration,
  signIn,
  checkAuth,
  updateProfile,
  createArticle,
} from "../testApi";

export const articleSlice = createSlice({
  name: "posts",
  initialState: {
    articles: [],
    articlesCount: 0,
    loading: false,
    state: null,
    articleRequestStatus: false,
    currentArticle: null,
    error: false,
    stateMessage: null,
    login: false,

    username: null,
    email: null,
    image: null,
  },
  reducers: {},
  extraReducers: {
    [getArticles.pending]: (state, action) => {
      state.articleRequestStatus = "pending";
    },
    [getArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = "fulfilled";
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

    [signIn.fulfilled]: (state) => {
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
    [updateProfile.rejected]: (error) => [console.log(error)],
    [updateProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default articleSlice.reducer;
