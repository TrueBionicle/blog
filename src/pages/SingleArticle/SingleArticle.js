import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticleBySlug } from "../../store/articleAsyncThunk";
import ButtonBack from "../../components/utilites/ButtonBack";
import UserButtons from "./UserButtons/UserButtons";
import Article from "../../components/Article/Article";
import "./SingleArticle.scss";
const SingleArticle = () => {
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
    return (
      <>
        <ButtonBack />
        <div className="single_article ">
          <Article article={currentArticle} singlePage />
          {currentArticle.author.username === username ? (
            <UserButtons slug={slug} login={login} />
          ) : null}
        </div>
      </>
    );
  }
};

export default SingleArticle;
