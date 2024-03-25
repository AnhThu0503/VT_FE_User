import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Form, Input, Radio, notification } from "antd";
import axios from "axios";
const key = "updatable";

const Register = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const handleRegister = async (values) => {
    if (values.password === values.passwordConfirm) {
      const response = await axios.post("/api/users", values);
      if (response.data.success) {
        api.open({
          key,
          message: <p>Đăng ký thành công</p>,
        });
        window.location.href = "/login";
      } else {
        api.open({
          key,
          message: response.data.message,
        });
      }
    } else {
      api.open({
        key,
        message: <p>Mật khẩu không khớp</p>,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-container my-4" style={{ paddingTop: "4.5rem" }}>
      <div className="row">
        <div className="register-content col-12  py-3 mx-auto">
          <div className="text-center text-register mb-3">
            Đăng ký tài khoản
          </div>
          {contextHolder}
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
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              className=""
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập SĐT!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" type="tel" />
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
                className="btn-login"
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Đăng ký tài khoản
              </Button>
            </Form.Item>
            <Form.Item className="text-center">
              <div style={{ color: "#337ab7" }} className="mb-2">
                Bạn đã có tài khoản ?
              </div>
              <Link to="/login">
                <Button
                  className="btn-register"
                  type="primary"
                  htmlType="submit"
                >
                  Đăng nhập ngay
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
