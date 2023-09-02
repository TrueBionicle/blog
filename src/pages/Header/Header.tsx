import { Link } from "react-router-dom";
import "./Header.scss";
import { useEffect } from "react";
import { checkAuth } from "../../store/userAsyncThunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Header = () => {
  const dispatch = useAppDispatch();

  const login = useAppSelector((state) => state.user.login);
  const username = useAppSelector((state) => state.user.username);
  const image = useAppSelector((state) => state.user.image);

  const logOut = () => {
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [username, login]);

  return login ? (
    <div className="header">
      <Link to={"/articles"} className="header__icon">
        RealWorld Blog
      </Link>
      <div className="header__right">
        <Link to={"create-article"} className="signUp">
          Create article
        </Link>
        <Link to={"edit-profile"} className="user_info">
          {username}
          <div className="article__user__avatar">
            <img
              className="avatar"
              src={image || require("../../assets/images/avatar.png")}
              alt="avatar"
            ></img>
          </div>{" "}
        </Link>
        <Link
          to={"sign-in"}
          className="signIn"
          onClick={() => {
            logOut();
            dispatch(checkAuth());
          }}
        >
          Log Out
        </Link>
      </div>
    </div>
  ) : (
    <div className="header">
      <Link to={"/articles"} className="header__icon">
        RealWorld Blog
      </Link>
      <div className="header__buttons">
        <Link to={"sign-in"} className="signIn">
          Sign In
        </Link>
        <Link to={"create-account"} className="signUp">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
