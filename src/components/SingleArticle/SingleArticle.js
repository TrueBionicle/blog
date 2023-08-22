import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticleBySlug, deleteArticle } from "../../store/articleAsyncThunk";
import UserButtons from "./UserButtons/UserButtons";
import Article from "../Article/Article";
import "./SingleArticle.scss";

const SingleArticle = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const currentArticle = useSelector((state) => state.articles.currentArticle);
  const loading = useSelector((state) => state.articles.loading);
  const login = useSelector((state) => state.user.login);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleBySlug(slug));
  }, []);

  if (currentArticle !== null && loading !== true) {
    return (
      <div className="single_article ">
        <Article article={currentArticle} singlePage />
        <UserButtons slug={slug} login={login} />
        <button onClick={back}>Back</button>
      </div>
    );
  }
};

export default SingleArticle;
