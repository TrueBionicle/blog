import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";

import ArticleList from "../../pages/ArticleList/ArticleList";
import SingleArticle from "../../pages/SingleArticle/SingleArticle";
import Layout from "../Layout/Layout";
import CreateAccount from "../../pages/CreateAccount/CreateAccount";
import SignIn from "../../pages/SignIn/SignIn";
import EditProfile from "../../pages/EditProfile/EditProfile";
import CreateArticle from "../../pages/CreateArticle/CreateArticle";
import EditArticle from "../../pages/EditArticle/EditArticle";
import RequireAuth from "../hoc/RequireAuth";
import { useSelector } from "react-redux";

const App = () => {
  const login = useSelector((state) => state.user.login);
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />}></Route>
          <Route path="articles" element={<ArticleList />}></Route>
          <Route path="create-account" element={<CreateAccount />}></Route>

          <>
            <Route
              path="create-article"
              element={
                <RequireAuth>
                  <CreateArticle />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="edit-profile"
              element={
                <RequireAuth>
                  <EditProfile />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="edit-article/:slug"
              element={
                <RequireAuth>
                  <EditArticle />
                </RequireAuth>
              }
            ></Route>
          </>

          <Route path="sign-in" element={<SignIn />}></Route>
          <Route
            path="single-articles/:slug"
            element={<SingleArticle />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
