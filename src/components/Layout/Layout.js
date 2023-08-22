import { Outlet } from "react-router-dom";

import "./Layout.scss";

import Header from "../Header/Header";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
