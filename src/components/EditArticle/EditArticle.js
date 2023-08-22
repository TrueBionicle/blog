import "./EditArticle.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import uniqueKey from "../utilites/uniqueKey";
import { updateArticle, getArticleBySlug } from "../../testApi";
import { useParams } from "react-router-dom";

const EditArticle = () => {
  const dispatch = useDispatch();
  const currentArticle = useSelector((state) => state.currentArticle);
  const [tagList, setTagList] = useState([]);

  const [tagValue, setTagValue] = useState("");
  const { TextArea } = Input;
  const handleClickDeleteTag = (currentIndex) => {
    setTagList(tagList.filter((_, index) => index !== currentIndex));
  };
  const { slug } = useParams();
  console.log(currentArticle);
  useEffect(() => {
    dispatch(getArticleBySlug(slug));
  }, []);

  const handleClickAddTag = () => {
    if (tagValue) {
      setTagList([...tagList, tagValue]);
      setTagValue("");
    }
  };

  if (currentArticle !== null && tagList.length === 0) {
    setTagList(currentArticle.tagList);
  }

  const onFinish = (values) => {
    const slug = currentArticle.slug;
    const result = { ...values, tagList, slug };
    console.log(result);
    dispatch(updateArticle(result));
  };
  return tagList.length !== 0 ? (
    <div className="create_article_modal">
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
              //   required: true,
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
              //   required: true,
              message: "Email is not valid",
            },
          ]}
        >
          <Input defaultValue={currentArticle.description} />
        </Form.Item>

        <Form.Item
          name="text"
          label="Text"
          //  rules={[{ required: true }]}
        >
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
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : null;
};

export default EditArticle;
