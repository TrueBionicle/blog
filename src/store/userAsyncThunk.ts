import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type UserInfo = {
  username?: string;
  email: string;
  password?: string;
  image?: string;
};

export const registration = createAsyncThunk(
  "registration",
  async function ({ username, email, password }: UserInfo) {
    const BASE_URL = `https://blog.kata.academy/api/users`;
    const b = axios
      .post(BASE_URL, {
        user: {
          username: username,
          email: email,
          password: password,
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

export const signIn = createAsyncThunk(
  "sign-in",
  async function ({ email, password }: UserInfo) {
    const BASE_URL = `https://blog.kata.academy/api/users/login`;
    const b = axios
      .post(BASE_URL, {
        user: {
          email: email,
          password: password,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.user.token);
      })
      .catch((error) => {
        throw new Error(
          error.response.data.errors.username ? "username" : "email"
        );
      });
    return b;
  }
);

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
  async function ({ username, email, password, image }: UserInfo) {
    console.log(username, email, password, image);
    const BASE_URL = `https://blog.kata.academy/api/user`;
    const b = axios
      .put(
        BASE_URL,
        {
          user: {
            email: email,
            username: username,
            password: password,
            image: image,
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
        localStorage.setItem("token", res.data.user.token);
        return res.data;
      });

    return b;
  }
);
