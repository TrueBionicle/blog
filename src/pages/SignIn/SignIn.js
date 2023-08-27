import "./SignIn.scss";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../store/userAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notificationSignIn } from "../../components/Notification/Notification";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const login = useSelector((state) => state.user.login);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const onFinish = (values) => {
    dispatch(
      signIn({
        email: values.email,
        password: values.password,
      })
    );
  };
  useEffect(() => {
    if (!errorMessage === false) {
      notificationSignIn(messageApi, errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (login) {
      navigate("/articles");
    }
  }, [login]);

  return (
    <div className="SignIn">
      {contextHolder}
      <h2 className="SignIn__title"> Sign In</h2>
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
          label="Email Address"
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
          wrapperCol={{
            offset: 30,
            span: 30,
          }}
          className="form_button__wrapper"
        >
          <Button type="primary" htmlType="submit" className="form_button">
            Sign In
          </Button>
        </Form.Item>
        <span className="create_account_modal__footer">
          Do not have an account? <Link to={"/create-account"}>Sign Up</Link>
        </span>
      </Form>
    </div>
  );
};

export default SignIn;
