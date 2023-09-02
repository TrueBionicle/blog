import Article from "../../components/Article/Article.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";

import CircularIndeterminate from "../../utilites/loadingIndicator.tsx";
import { getArticles } from "../../store/articleAsyncThunk.ts";
import Pagination from "../../components/Pagination/pagination.tsx";
import "./ArticleList.scss";
import { useEffect } from "react";
const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.articles);
  console.log(articles);
  const articlesCount = useAppSelector((state) => state.articles.articlesCount);
  const articleRequestStatus = useAppSelector(
    (state) => state.articles.articleRequestStatus
  );

  const loadingState = useAppSelector((state) => state.articles.loading);
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
