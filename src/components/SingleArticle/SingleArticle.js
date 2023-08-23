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
  const username = useSelector((state) => state.user.username);
  const loading = useSelector((state) => state.articles.loading);
  const login = useSelector((state) => state.user.login);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleBySlug(slug));
  }, []);

  if (currentArticle !== null && loading !== true) {
    console.log(currentArticle.author.username === username);

    return (
      <div className="single_article ">
        <Article article={currentArticle} singlePage />
        {currentArticle.author.username === username ? (
          <UserButtons slug={slug} login={login} />
        ) : null}

        <button onClick={back}>Back</button>
      </div>
    );
  }
};

export default SingleArticle;
