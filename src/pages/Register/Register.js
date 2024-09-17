import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Form, Input, Radio, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const key = "updatable";

const Register = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    if (values.password === values.passwordConfirm) {
      const response = await axios.post("/api/users", values);
      if (response.data.success) {
        messageApi.open({
          type: "success",
          content: "Đăng ký tài khoản thành công",
        });
        navigate("/login");
      } else {
        messageApi.open({
          type: "error",
          content: "Đăng ký tài khoản thất bại",
        });
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Mật khẩu không khớp",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-container " style={{ paddingTop: "4.5rem" }}>
      <contextHolder />
      <div
        className="container position-sticky z-index-sticky"
        style={{ paddingTop: "6.5rem" }}
      >
        <main className="mt-0 main-content">
          <section>
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                    <div className="card card-plain">
                      <div className="pb-0 card-header text-start">
                        <h4 className="font-weight-bolder text-center py-2">
                          Đăng ký
                        </h4>
                      </div>
                      <div className="card-body">
                        <Form
                          name="basic"
                          initialValues={{
                            remember: true,
                            sex: "1",
                          }}
                          onFinish={handleRegister}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                          layout="vertical"
                        >
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập họ!",
                              },
                            ]}
                          >
                            <Input placeholder="Tên" />
                          </Form.Item>

                          <Form.Item
                            className=""
                            name="email"
                            rules={[
                              {
                                type: "email",
                                message: "Địa chỉ email không hợp lệ!",
                              },
                              {
                                required: true,
                                message: "Vui lòng nhập email!",
                              },
                            ]}
                          >
                            <Input placeholder="Email" />
                          </Form.Item>
                          <Form.Item
                            className=""
                            name="phone"
                            rules={[
                              {
                                pattern: /^[0-9]+$/,
                                message:
                                  "Số điện thoại chỉ được chứa các chữ số!",
                              },
                              {
                                len: 10,
                                message: "Số điện thoại phải có 10 chữ số!",
                              },
                              {
                                required: true,
                                message: "Vui lòng nhập SĐT!",
                              },
                            ]}
                          >
                            <Input placeholder="Số điện thoại" />
                          </Form.Item>
                          <Form.Item
                            className=""
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập Mật khẩu!",
                              },
                            ]}
                          >
                            <Input.Password placeholder="Mật khẩu" />
                          </Form.Item>
                          <Form.Item
                            className=""
                            name="passwordConfirm"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu!",
                              },
                            ]}
                          >
                            <Input.Password placeholder="Xác nhận mật khẩu" />
                          </Form.Item>
                          <Form.Item label="Giới tính" name="sex">
                            <Radio.Group>
                              <Radio.Button value="1">Nam</Radio.Button>
                              <Radio.Button value="2">Nữ</Radio.Button>
                              <Radio.Button value="3">Khác</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item className="text-center">
                            <Button
                              className="btn-register"
                              style={{ width: "100%" }}
                              type="primary"
                              htmlType="submit"
                            >
                              Đăng ký tài khoản
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                      <div className="px-1 pt-0 text-center card-footer px-lg-2">
                        <p className="mx-auto mb-4 text-sm pt-2">
                          Bạn đã có tài khoản?{" "}
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            Đăng nhập
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
export default Register;
