import "./EditArticle.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { Form, Input, Button } from "antd";
import uniqueKey from "../../utilites/uniqueKey.ts";
import {
  updateArticle,
  getArticleBySlug,
} from "../../store/articleAsyncThunk.ts";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../utilites/ButtonBack.tsx";

import { ArticleInfo } from "../../types.ts";

const EditArticle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentArticle = useAppSelector(
    (state) => state.articles.currentArticle
  );
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");
  const { TextArea } = Input;

  const handleClickDeleteTag = (currentIndex: number) => {
    setTagList(tagList.filter((_, index) => index !== currentIndex));
  };

  const { slug } = useParams();

  useEffect(() => {
    if (slug) dispatch(getArticleBySlug(slug));
  }, []);

  const handleClickAddTag = () => {
    if (tagValue) {
      setTagList([...tagList, tagValue]);
      setTagValue("");
    }
  };

  if (
    currentArticle !== null &&
    currentArticle.tagList.length !== 0 &&
    tagList.length === 0
  ) {
    setTagList(currentArticle.tagList);
  }

  const onFinish = (values: ArticleInfo) => {
    const slug = currentArticle.slug;
    const result = { ...values, tagList, slug };
    dispatch(updateArticle(result));
    navigate("/articles");
  };
  return currentArticle !== null ? (
    <div className="create_article_modal">
      <ButtonBack />
      <h2 className="create_article_modal__title">Edit Article</h2>
      <Form
        onFinish={onFinish}
        className="create_account_modal__form"
        name="basic"
        layout="vertical"
        labelCol={{
          span: 30,
        }}
        wrapperCol={{
          span: 30,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              message: "Please input title!",
            },
          ]}
        >
          <Input defaultValue={currentArticle.title} />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          rules={[
            {
              message: "Email is not valid",
            },
          ]}
        >
          <Input defaultValue={currentArticle.description} />
        </Form.Item>

        <Form.Item name="text" label="Text">
          <TextArea defaultValue={currentArticle.body} rows={8}></TextArea>
        </Form.Item>

        <div className="tag__wrapper">
          {tagList &&
            tagList.map((item, index) => {
              return (
                <div key={uniqueKey()} className="tag">
                  <span>Tag</span>
                  <Input
                    value={item}
                    placeholder="Add Tag"
                    className="tag__text"
                  ></Input>
                  <button
                    type="button"
                    className="tag__button_delete"
                    onClick={() => {
                      handleClickDeleteTag(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <div className="tag">
            <span>Tag</span>
            <Input
              value={tagValue}
              placeholder="Add Tag"
              className="tag__text"
              onChange={(e) => {
                setTagValue(e.target.value);
              }}
            ></Input>
          </div>
          <button
            type="button"
            className="button_add"
            onClick={handleClickAddTag}
          >
            Add Tag
          </button>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 30,
            span: 30,
          }}
          className="form_button__wrapper"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="form_button form_button--create"
            // onClick={}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : null;
};

export default EditArticle;
