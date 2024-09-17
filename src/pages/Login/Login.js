/* eslint-disable jsx-a11y/alt-text */
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
      <div
        className="container position-sticky z-index-sticky"
        style={{ paddingTop: "6.5rem" }}
      >
        {contextHolder}

        <main className="mt-0 main-content">
          <section>
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                    <div className="card card-plain">
                      <div className="pb-0 card-header text-start">
                        <h4 className="font-weight-bolder text-center py-2">
                          Đăng nhập
                        </h4>
                      </div>
                      <div className="card-body">
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
                        </Form>
                      </div>
                      <div className="px-1 pt-0 text-center card-footer px-lg-2">
                        <p className="mx-auto mb-4 text-sm pt-2">
                          Bạn chưa có tài khoản?{" "}
                          <Link
                            to="/register"
                            style={{ textDecoration: "none" }}
                          >
                            Đăng ký
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
                    <div
                      className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                      style={{
                        backgroundImage:
                          'url("https://www.fluentu.com/blog/wp-content/uploads/site//4/vegetables-1.jpg")',
                        backgroundSize: "cover",
                      }}
                    >
                      <span className="mask bg-gradient-success opacity-6"></span>
                      <h4 className="mt-5 text-white font-weight-bolder position-relative">
                        "An toàn từ nguồn gốc, tươi ngon từ trái tim"
                      </h4>
                      <p className="text-white position-relative">
                        Sự lựa chọn thông minh cho sức khỏe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default Login;
