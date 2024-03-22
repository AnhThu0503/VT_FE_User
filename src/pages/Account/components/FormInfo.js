import {
    Button,
    notification,
    Form,
    Input,
} from 'antd';
import axios from 'axios';
import { useOutletContext, Link } from "react-router-dom";
const key = 'updatable';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const FormInfo = () => {
    const [customer, setCustomer] = useOutletContext();
    const [api, contextHolder] = notification.useNotification();

    const updateInfoCustomer = async (values) => {
        try {
            const response = await axios.put('/api/customer', {ND_id: customer.ND_id, name: values.name, phone: values.phone})
            if(response.data){
                api.open({
                    key,
                    message: 'Cập nhật thông tin thành công'
                });
            } else {
                api.open({
                    key,
                    message: 'Cập nhật thông tin thất bại'
                });
            }
        }catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            {
                customer?.ND_id ? <Form
                    {...formItemLayout}
                    variant="filled"
                    style={{
                        maxWidth: 600,
                        width: '100%'
                    }}
                    onFinish={updateInfoCustomer}
                    initialValues={{ name: customer.ND_ten, email: customer.ND_email, phone: customer.ND_SDT, address: customer.ND_diaChi }}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
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
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <p>{customer.ND_email}</p>
                    </Form.Item>
                    <Form.Item
                        label="SĐT"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        {
                            customer.ND_diaChi ? <p>{customer.ND_diaChi}</p>:<Link to="address">Cập nhật địa chỉ   </Link>
                        }
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form> :
                    <div className="box-loader">
                        <span class="loader"></span>
                    </div>
            }
            {contextHolder}
        </div>
    )
}

export default FormInfo