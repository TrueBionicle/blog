import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticleBySlug, deleteArticle } from "../../store/articleAsyncThunk";
import Article from "../Article/Article";
import "./SingleArticle.scss";
import uniqueKey from "../utilites/uniqueKey";

const SingleArticle = () => {
  const currentArticle = useSelector((state) => state.articles.currentArticle);
  const loading = useSelector((state) => state.articles.loading);
  const login = useSelector((state) => state.user.login);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleBySlug(slug));
  }, []);

  if (currentArticle !== null && loading !== true) {
    const single = "article--single";
    return (
      <div className="single_article ">
        <Article article={currentArticle} singlePage />
        {login ? (
          <div className="article__user__buttons">
            <button
              className="article__user__button article__user__button__delete"
              onClick={() => {
                dispatch(deleteArticle(slug));
              }}
            >
              Delete
            </button>
            <Link
              to={`/edit-article/${slug}`}
              className="article__user__button article__user__button__edit"
            >
              Edit
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
};

export default SingleArticle;
