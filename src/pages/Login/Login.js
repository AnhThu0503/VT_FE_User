import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, notification, message } from "antd";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import gg from "../../assets/logo/gg.png";
// import { login } from "../../store/features/auth";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";

const key = "updatable";

const Login = () => {
  const [userLoginGoogle, setUserLoginGoogle] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserLoginGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    console.log("userLoginGoogle", userLoginGoogle);
    if (userLoginGoogle) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userLoginGoogle.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userLoginGoogle.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("res.data", res.data);
          axios
            .post("/api/login-google", {
              profile: res.data,
            })
            .then((res) => {
              console.log("res.data", res.data);
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                messageApi.open({
                  type: "success",
                  content: "Đăng nhập thành công",
                });
                authLogin(res.data.token);
                navigate("/");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [userLoginGoogle]);

  // useEffect(() => {
  //   if (profile !== null) {
  //   }
  // }, [profile]);

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
    <div className="login-container " style={{ paddingTop: "4.5rem" }}>
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
              <div className="text-center m-3">
                <Button onClick={() => login()} className="pb-2">
                  Đăng nhập với Google
                  <img
                    src={gg}
                    style={{ width: "40px", height: "30px" }}
                    className=""
                  ></img>
                </Button>
              </div>
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
