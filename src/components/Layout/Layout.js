import { Link, Outlet } from "react-router-dom";

import "./Layout.scss";

import Header from "../Header/Header";
import SignIn from "../SignIn/SignIn";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
