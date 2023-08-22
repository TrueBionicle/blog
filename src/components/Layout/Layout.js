import { Outlet } from "react-router-dom";

import "./Layout.scss";

import Header from "../Header/Header";
import { Article } from "@mui/icons-material";
import ArticleList from "../ArticleList/ArticleList";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
