import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  setFavoriteArticle,
  unfavoriteAnArticle,
} from "../../store/articleAsyncThunk";
import uniqueKey from "../utilites/uniqueKey";

import "./Article.scss";

const Article = (props) => {
  const { article, singlePage } = props;
  const login = useSelector((state) => state.user.login);
  const [checkFavorite, setCheckFavorite] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const dispatch = useDispatch();
  const setDate = (date) => {
    const time = new Date(date).toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return time;
  };
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
        {article.tagList.map((item) => (
          <span key={uniqueKey()} className="article__info__tag">
            {item}
          </span>
        ))}
        <p className="article__info__description">{article.description}</p>
        <p className="article__info__text">{article.body}</p>
      </div>
      <div className="article__user">
        <div className="article__user__info">
          <span className="article__user__info__name">
            {article.author.username}
          </span>
          <span className="article__user__info__date">
            {setDate(article.createdAt)}
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
