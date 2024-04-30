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
      <div className="container">
        <div className=" row">
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
                    message: "Số điện thoại chỉ được chứa các chữ số!",
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
    </div>
  );
};
export default Register;
