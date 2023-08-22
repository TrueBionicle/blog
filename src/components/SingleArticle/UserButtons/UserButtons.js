import "./UserButtons.scss";

import { useDispatch } from "react-redux";
import { deleteArticle } from "../../../store/articleAsyncThunk";
import { Button, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
const UserButtons = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, login } = props;
  return (
    <>
      {login ? (
        <div className="article__user__buttons">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            onConfirm={() => {
              dispatch(deleteArticle(slug));
              navigate("/articles");
            }}
            cancelText="No"
            onClick={() => {}}
          >
            <button className="article__user__button article__user__button__delete">
              Delete
            </button>
          </Popconfirm>
          <Link
            to={`/edit-article/${slug}`}
            className="article__user__button article__user__button__edit"
          >
            Edit
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default UserButtons;
