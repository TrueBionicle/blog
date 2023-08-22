import { Link } from "react-router-dom";

import "./Header.scss";
import { useEffect } from "react";
import { checkAuth } from "../../store/userAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const login = useSelector((state) => state.user.login);
  const username = useSelector((state) => state.user.username);
  const logOut = () => {
    localStorage.setItem("token", "");
  };
  const dispatch = useDispatch();
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
        <Link to={"edit-profile"}>{username}</Link>
        <div className="article__user__avatar">
          <img
            className="avatar"
            src={require("../../assets/images/avatar.png")}
            alt="avatar"
          ></img>
        </div>{" "}
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
