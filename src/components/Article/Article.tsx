import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  setFavoriteArticle,
  unfavoriteAnArticle,
} from "../../store/articleAsyncThunk.ts";
import uniqueKey from "../../utilites/uniqueKey.ts";
import convertDate from "../../utilites/ConvertDate.ts";
import "./Article.scss";

const Article = (props: any) => {
  const { article, singlePage } = props;

  const dispatch = useAppDispatch();

  const login = useAppSelector((state) => state.user.login);

  const [checkFavorite, setCheckFavorite] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  const checkSinglePage = () => {
    if (singlePage) {
      return "single_page";
    } else {
      return "";
    }
  };

  return (
    <div className={`article ${checkSinglePage()}`}>
      <div className="article__info">
        <div className="article__info__header">
          <Link
            to={`/single-articles/${article.slug}`}
            className="article__info__header__tittle"
          >
            {article.title}
          </Link>
          <Checkbox
            icon={<FavoriteBorder className="favorite" />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            disabled={!login}
            checked={checkFavorite}
            onClick={() => {
              if (checkFavorite) {
                dispatch(unfavoriteAnArticle(article.slug));
                setCheckFavorite(false);
                setFavoritesCount(favoritesCount - 1);
              } else {
                dispatch(setFavoriteArticle(article.slug));
                setCheckFavorite(true);
                setFavoritesCount(favoritesCount + 1);
              }
            }}
          />
          <span className="heart__button__num">{favoritesCount}</span>
        </div>
        {article.tagList.map((item: string) => (
          <span key={uniqueKey()} className="article__info__tag">
            {item}
          </span>
        ))}
        <p className="article__info__description">{article.description}</p>
        <ReactMarkdown className="article__info__text">
          {article.body}
        </ReactMarkdown>
      </div>
      <div className="article__user">
        <div className="article__user__info">
          <span className="article__user__info__name">
            {article.author.username}
          </span>
          <span className="article__user__info__date">
            {convertDate(article.createdAt)}
          </span>
        </div>
        <div className="article__user__avatar">
          <img src={`${article.author.image}`} alt="avatar"></img>
        </div>
      </div>
    </div>
  );
};
export default Article;
