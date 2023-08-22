import "./SignIn.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { signIn } from "../../testApi";
import { useDispatch } from "react-redux";
const SignIn = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(
      signIn({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <div className="SignIn">
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
            Create
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
