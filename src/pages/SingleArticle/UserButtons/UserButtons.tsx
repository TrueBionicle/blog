import "./UserButtons.scss";
import { deleteArticle } from "../../../store/articleAsyncThunk.ts";
import { Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks.ts";

type UserButton = {
  slug: string;
  login: boolean;
};

const UserButtons = (props: UserButton) => {
  const dispatch = useAppDispatch();
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
