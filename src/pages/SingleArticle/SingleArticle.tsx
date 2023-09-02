import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { getArticleBySlug } from "../../store/articleAsyncThunk.ts";
import ButtonBack from "../../utilites/ButtonBack.tsx";
import UserButtons from "./UserButtons/UserButtons.tsx";
import Article from "../../components/Article/Article.tsx";
import "./SingleArticle.scss";
const SingleArticle: React.FC = () => {
  const currentArticle = useAppSelector(
    (state) => state.articles.currentArticle
  );
  const username = useAppSelector((state) => state.user.username);
  const loading = useAppSelector((state) => state.articles.loading);
  const login = useAppSelector((state) => state.user.login);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (slug) dispatch(getArticleBySlug(slug));
  }, [dispatch, slug]);

  if (currentArticle !== null && loading !== true) {
    return (
      <>
        <ButtonBack />
        <div className="single_article ">
          <Article article={currentArticle} singlePage />
          {currentArticle.author.username === username && slug ? (
            <UserButtons slug={slug} login={login} />
          ) : null}
        </div>
      </>
    );
  }
};

export default SingleArticle;
