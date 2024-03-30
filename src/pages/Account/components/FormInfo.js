import { Button, notification, Form, Input } from "antd";
import axios from "axios";
import { useOutletContext, Link } from "react-router-dom";
const key = "updatable";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 3,
    },
  },
  // wrapperCol: {
  //   xs: {
  //     span: 24,
  //   },
  //   sm: {
  //     span: 14,
  //   },
  // },
};

const FormInfo = () => {
  const [customer] = useOutletContext();
  const [api, contextHolder] = notification.useNotification();

  const updateInfoCustomer = async (values) => {
    try {
      const response = await axios.put("/api/customer", {
        ND_id: customer.ND_id,
        name: values.name,
        phone: values.phone,
      });
      if (response.data) {
        api.open({
          key,
          type: "success",
          message: "Cập nhật thông tin thành công",
        });
      } else {
        api.open({
          key,
          type: "error",
          message: "Cập nhật thông tin thất bại",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="col-sm-12">
      {customer?.ND_id ? (
        <Form
          {...formItemLayout}
          variant="filled"
          layout="vertical"
          style={{
            width: "100%",
          }}
          onFinish={updateInfoCustomer}
          initialValues={{
            name: customer.ND_ten,
            email: customer.ND_email,
            phone: customer.ND_SDT,
            address: customer.ND_diaChi,
          }}
        >
          <Form.Item
            label="TÊN"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="EMAIL"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input value={customer.ND_email} disabled></Input>
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống SĐT!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ĐỊA CHỈ"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            {customer.ND_diaChi ? (
              <Input
                value={customer.ND_diaChi}
                disabled
                style={{ width: "100%" }}
              ></Input>
            ) : (
              <Link to="address">Cập nhật địa chỉ </Link>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{}} className="text-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#ff4d00" }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="box-loader">
          <span className="loader"></span>
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default FormInfo;
