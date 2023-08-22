import Article from "../Article/Article";
import { useDispatch, useSelector } from "react-redux";

import CircularIndeterminate from "./../utilites/loadingIndicator";
import { getArticles } from "../../testApi";
import Pagination from "../Pagination/pagination";
import "./ArticleList.scss";
import { useEffect } from "react";
import uniqueKey from "../utilites/uniqueKey";
const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const articleRequestStatus = useSelector(
    (state) => state.articleRequestStatus
  );
  const loadingState = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(getArticles(1));
  }, [dispatch]);
  return (
    <>
      {articleRequestStatus === "fulfilled" && (
        <div className="article__list">
          {/* {loadingState ? CircularIndeterminate() : null} */}

          {articles.map((article) => {
            return <Article key={uniqueKey()} article={article} />;
          })}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default ArticleList;
