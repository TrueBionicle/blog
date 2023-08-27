import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async function (page) {
    const BASE_URL = `https://blog.kata.academy/api/articles?&limit=5&offset=${
      (page - 1) * 5
    }`;
    return axios
      .get(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .catch(() => {
        throw new Error();
      });
  }
);

export const getArticleBySlug = createAsyncThunk(
  "articles/getArticleBySlug",
  async function (slug) {
    const BASE_URL = `https://blog.kata.academy/api/articles/${slug}`;
    const a = axios
      .get(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data);
    return a;
  }
);

export const createArticle = createAsyncThunk(
  "createProfile",
  async function (data) {
    const BASE_URL = "https://blog.kata.academy/api/articles";
    console.log(localStorage.getItem("token"));
    console.log(data.tagList);
    const b = axios
      .post(
        BASE_URL,
        {
          article: {
            title: `${data.title}`,
            description: `${data.description}`,
            body: `${data.text}`,
            tagList: data.tagList,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch(() => {
        throw new Error();
      });
    return b;
  }
);

export const deleteArticle = createAsyncThunk(
  "deleteArticle",
  async function (slug) {
    const BASE_URL = `https://blog.kata.academy/api/articles/${slug}`;
    axios.delete(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }
);

export const updateArticle = createAsyncThunk(
  "updateProfile",
  async function (data) {
    const BASE_URL = `https://blog.kata.academy/api/articles/${data.slug}`;
    const b = axios
      .put(
        BASE_URL,
        {
          article: {
            title: data.title,
            description: data.description,
            body: data.body,
            tagList: data.tagList,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    return b;
  }
);

export const setFavoriteArticle = createAsyncThunk(
  "setFavoriteArticle",
  async function (slug) {
    const BASE_URL = `https://blog.kata.academy/api/articles/${slug}/favorite`;
    axios
      .post(
        BASE_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res));
  }
);

export const unfavoriteAnArticle = createAsyncThunk(
  "setFavoriteArticle",
  async function (slug) {
    const BASE_URL = `https://blog.kata.academy/api/articles/${slug}/favorite`;
    axios
      .delete(
        BASE_URL,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res));
  }
);
