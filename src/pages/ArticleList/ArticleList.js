import Article from "../../components/Article/Article";
import { useDispatch, useSelector } from "react-redux";

import CircularIndeterminate from "../../utilites/loadingIndicator";
import { getArticles } from "../../store/articleAsyncThunk";
import Pagination from "../../components/Pagination/pagination";
import "./ArticleList.scss";
import { useEffect } from "react";
const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const articleRequestStatus = useSelector(
    (state) => state.articles.articleRequestStatus
  );

  const loadingState = useSelector((state) => state.articles.loading);
  useEffect(() => {
    dispatch(getArticles(1));
  }, [dispatch, articlesCount]);

  return (
    <>
      {articleRequestStatus === "fulfilled" && (
        <div className="article__list">
          {loadingState ? CircularIndeterminate() : null}
          {articles.map((article, index) => {
            return <Article key={index} article={article} />;
          })}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default ArticleList;
