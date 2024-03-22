import './Account.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<Link to="">Thông tin</Link>),
    getItem(<Link to="address">Địa chỉ</Link>),
    getItem(<Link to="order">Đơn hàng</Link>),
];

const Account = (props) => {
    const { user } = useContext(UserContext)
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        if (user?.ND_id) {
            getInfoCustomer()
        }
    }, [user.ND_id])

    const getInfoCustomer = async () => {
        try {
            const response = await axios.get('/api/customer', {
                params: {
                    ND_id: user.ND_id
                }
            })
            if (response.data) {
                setCustomer(response.data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="container-fluid account-background my-4">
            <div className="container account-container" >
                <div className='col-sm-12 p-5 box-user' style={{ backgroundColor: ' #ffffff', borderRadius: '10px' }}>
                    <div className="box-user-left">
                        <div className="box-user-left-top">
                            <UserOutlined />
                            <span>{customer.ND_ten}</span>
                        </div>
                        <Menu
                            theme={'light'}
                            style={{
                                width: 256,
                            }}
                            mode="inline"
                            items={items}
                        />
                    </div>
                    <div className="box-user-right">
                        <Outlet context={[customer, setCustomer]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Account;