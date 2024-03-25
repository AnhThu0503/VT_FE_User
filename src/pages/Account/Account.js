import "./Account.scss";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Menu } from "antd";
import { IoPersonCircleOutline } from "react-icons/io5";

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
  getItem(
    <Link to="" style={{ fontSize: "18px" }} className="item">
      Thông tin
    </Link>
  ),
  getItem(
    <Link to="address" style={{ fontSize: "18px" }}>
      Địa chỉ
    </Link>
  ),
  getItem(
    <Link to="order" style={{ fontSize: "18px" }}>
      Đơn hàng
    </Link>
  ),
];

const Account = (props) => {
  const { user } = useContext(UserContext);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (user?.ND_id) {
      getInfoCustomer();
    }
  }, [user.ND_id]);

  const getInfoCustomer = async () => {
    try {
      const response = await axios.get("/api/customer", {
        params: {
          ND_id: user.ND_id,
        },
      });
      if (response.data) {
        setCustomer(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="container-fluid account-background my-4"
      style={{ paddingTop: "4.5rem" }}
    >
      <div className="container account-container">
        <div
          className="col-sm-12 p-5 box-user"
          style={{ backgroundColor: " #ffffff", borderRadius: "10px" }}
        >
          <div className="box-user-left col-sm-3">
            <div className="box-user-left-top">
              <IoPersonCircleOutline
                style={{ fontSize: "40px", color: "#ff4d00" }}
                className=""
              />
              <span
                style={{
                  color: "#ff4d00",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                {customer.ND_ten}
              </span>
            </div>
            <Menu theme={"light"} style={{}} mode="inline" items={items} />
          </div>
          <div className="box-user-right col-sm-9 mt-3">
            <Outlet context={[customer, setCustomer]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
