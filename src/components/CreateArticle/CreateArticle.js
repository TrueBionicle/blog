import { useState } from "react";
import "./CreateArticle.scss";
import { Form, Input, Checkbox, Button } from "antd";
import uniqueKey from "../utilites/uniqueKey";
import { createArticle, getArticles } from "../../store/articleAsyncThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../utilites/ButtonBack";
const CreateArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tagList, setTagList] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const { TextArea } = Input;
  const handleClickDeleteTag = (currentIndex) => {
    setTagList(tagList.filter((_, index) => index !== currentIndex));
  };
  const handleClickAddTag = () => {
    if (tagValue) {
      setTagList([...tagList, tagValue]);
      setTagValue("");
    }
  };

  const onFinish = (values) => {
    const result = { ...values, tagList };
    dispatch(createArticle(result));
    dispatch(getArticles());
    navigate("/articles");
  };
  return (
    <div className="create_article_modal">
      <ButtonBack />
      <h2 className="create_article_modal__title">Create new article</h2>
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
              required: true,
              message: "Please input title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          rules={[
            {
              required: true,
              message: "Email is not valid",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="text" label="Text" rules={[{ required: true }]}>
          <TextArea rows={8}></TextArea>
        </Form.Item>

        <div className="tag__wrapper">
          {tagList.map((item, index) => {
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
  );
};

export default CreateArticle;
