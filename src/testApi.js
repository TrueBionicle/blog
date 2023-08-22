import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async function (page) {
    const BASE_URL = `https://blog.kata.academy/api/articles?&limit=5&offset=${
      (page - 1) * 5
    }`;
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
    console.log(a);
    return a;
  }
);

export const registration = createAsyncThunk(
  "registration",
  async function (data) {
    const BASE_URL = `https://blog.kata.academy/api/users`;
    const b = axios
      .post(BASE_URL, {
        user: {
          username: `${data.username}`,
          email: `${data.email}`,
          password: `${data.password}`,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => {
        throw new Error(
          error.response.data.errors.username ? "username" : "email"
        );
      });
    return b;
  }
);

export const signIn = createAsyncThunk("sign-in", async function (data) {
  const BASE_URL = `https://blog.kata.academy/api/users/login`;
  const b = axios
    .post(BASE_URL, {
      user: {
        email: `${data.email}`,
        password: `${data.password}`,
      },
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.user.token);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        error.response.data.errors.username ? "username" : "email"
      );
    });
  return b;
});

export const checkAuth = createAsyncThunk("check-auth", async function () {
  const BASE_URL = `https://blog.kata.academy/api/user`;
  const b = axios
    .get(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data.user;
    })
    .catch((error) => {
      throw new Error(
        error.response.data.errors.username ? "username" : "email"
      );
    });
  return b;
});

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async function (data) {
    const BASE_URL = `https://blog.kata.academy/api/user`;
    const b = axios
      .put(
        BASE_URL,
        {
          user: {
            email: data.email,
            username: data.username,
            password: data.password,
            image: data.image,
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
        localStorage.setItem("token", res.data.user.token);
        return res.data;
      });

    return b;
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
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
