import { Outlet } from "react-router-dom";
import CircularIndeterminate from "./../utilites/loadingIndicator";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import ModalError from "../ModalError/ModalError";
const Layout = () => {
  const loadingState = useSelector((state) => state.articles.loading);
  const errorState = useSelector((state) => state.articles.error);
  return (
    <>
      <Header />
      {loadingState ? CircularIndeterminate() : null}
      {errorState ? <ModalError /> : <Outlet />}
    </>
  );
};

export default Layout;
