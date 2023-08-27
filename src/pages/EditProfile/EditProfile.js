import { useDispatch } from "react-redux";
import "./EditProfile.scss";
import { Form, Input, Button } from "antd";

import { updateProfile } from "../../store/userAsyncThunk";
import ButtonBack from "../../utilites/ButtonBack";

const EditProfile = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      image: values.image,
    };
    dispatch(updateProfile(data));
  };
  return (
    <div className="create_account_modal">
      <ButtonBack />
      <h2 className="create_account_modal__title">Edit Profile</h2>
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
              //   required: true,
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
          label="New password"
          name="password"
          rules={[
            {
              //   required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Avatar image(url)"
          name="image"
          //   dependencies={["password"]}
          rules={[
            {
              type: "url",
              message: "Please set url!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 30,
            span: 30,
          }}
          className="form_button__wrapper"
        >
          <Button type="primary" htmlType="submit" className="form_button">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
