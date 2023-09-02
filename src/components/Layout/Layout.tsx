import { Outlet } from "react-router-dom";
import CircularIndeterminate from "../../utilites/loadingIndicator";
import Header from "../../pages/Header/Header";
import { useAppSelector } from "../../store/hooks";
import ModalError from "../../pages/ModalError/ModalError";
const Layout = () => {
  const articlesLoading = useAppSelector((state) => state.articles.loading);
  const userLoading = useAppSelector((state) => state.user.userLoading);
  const errorState = useAppSelector((state) => state.articles.error);
  return (
    <>
      <Header />
      {articlesLoading || userLoading ? CircularIndeterminate() : null}
      {errorState ? <ModalError /> : <Outlet />}
    </>
  );
};

export default Layout;
