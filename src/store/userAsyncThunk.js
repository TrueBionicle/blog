import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  if (localStorage.getItem("token")) {
    return axios
      .get(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.user;
      })
      .catch((error) => {
        console.log(error);
        throw new Error(
          error.response.data.errors.username ? "username" : "email"
        );
      });
  } else {
    throw new Error();
  }
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
