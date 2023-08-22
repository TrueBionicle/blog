import "./CreateAccount.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../../store/userAsyncThunk";
import { useDispatch } from "react-redux";
import { notification } from "../Notification/Notification";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
const CreateAccount = () => {
  const dispatch = useDispatch();
  const stateMessage = useSelector((state) => state.user.stateMessage);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    dispatch(
      registration({
        username: values.username,
        email: values.email,
        password: values.password,
      })
    );
  };
  useEffect(() => {
    notification(messageApi, stateMessage);
  }, [stateMessage]);
  return (
    <div className="create_account_modal">
      {contextHolder}
      <h2 className="create_account_modal__title">Create new account</h2>
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is not valid",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="agree"
          valuePropName="checked"
          wrapperCol={{
            offset: 30,
            span: 30,
          }}
          rules={[
            {
              required: true,
              message: "Should accept it",
            },
          ]}
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 30,
            span: 30,
          }}
          className="form_button__wrapper"
        >
          <Button type="primary" htmlType="submit" className="form_button">
            Create
          </Button>
        </Form.Item>
        <span className="create_account_modal__footer">
          Already have an account? <Link to={"/sign-in"}>Sign In</Link>
        </span>
      </Form>
    </div>
  );
};

export default CreateAccount;
