import { Routes, Route } from "react-router-dom";
import "./App.scss";

import ArticleList from "../ArticleList/ArticleList";
import SingleArticle from "../SingleArticle/SingleArticle";
import Layout from "../Layout/Layout";
import CreateAccount from "../CreateAccount/CreateAccount";
import SignIn from "../SignIn/SignIn";
import EditProfile from "../EditProfile/EditProfile";
import CreateArticle from "../CreateArticle/CreateArticle";
import EditArticle from "../EditArticle/EditArticle";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="articles" element={<ArticleList />}></Route>
          <Route path="create-account" element={<CreateAccount />}></Route>
          <Route path="create-article" element={<CreateArticle />}></Route>
          <Route path="edit-profile" element={<EditProfile />}></Route>
          <Route path="edit-article/:slug" element={<EditArticle />}></Route>
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
