import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, notification, message } from "antd";
import axios from "axios";
import { UserContext } from "../../context/userContext";
const key = "updatable";

const Login = () => {
  const { user, logout, setUser, authLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    const response = await axios.post("/api/login", values);
    // console.log("auth login ", response.data);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);

      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      // window.location.href = "/";
      authLogin(response.data.token);
      navigate("/");
    } else {
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-container mt-4 mb-5" style={{ paddingTop: "4.5rem" }}>
      <div className="container">
        <div className="row">
          {contextHolder}
          <div className="login-content col-12 py-3">
            <div className="text-center text-login ">Đăng nhập</div>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="text-center">
                <Button
                  className="btn-login"
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <Form.Item className="text-center">
                <div style={{ color: "#337ab7" }} className="mb-2">
                  Bạn chưa có tài khoản?
                </div>
                <Link to="/register">
                  <Button
                    className="btn-register"
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng ký tài khoản
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
