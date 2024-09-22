import "./Account.scss";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Menu } from "antd";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsBox } from "react-icons/bs";

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
    <>
      <BsInfoCircle className="fs-5 mb-1 me-2" />
      <Link to="" style={{ fontSize: "18px" }} className="item">
        Cập nhật thông tin cá nhân
      </Link>
    </>
  ),
  getItem(
    <>
      <BsGeoAlt className="fs-5 mb-1 me-2" />
      <Link to="address" style={{ fontSize: "18px" }}>
        Cập nhật địa chỉ
      </Link>
    </>
  ),
  getItem(
    <>
      <BsBox className="fs-5 mb-1 me-2" />

      <Link to="order" style={{ fontSize: "18px" }}>
        Quản lý đơn hàng
      </Link>
    </>
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
      className="container-fluid  account-background"
      style={{ paddingTop: "4.5rem" }}
    >
      <div className="account-container mt-2 ">
        <div className="col-sm-12 box-user " style={{ borderRadius: "10px" }}>
          <div
            className="box-user-left col-sm-3 p-4 mx-3 me-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="box-user-left-top">
              <IoPersonCircleOutline
                style={{ fontSize: "160px", color: "#b7b7b7" }}
              />
              <br />
              <span
                style={{
                  color: "#6bad0d",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                {customer.ND_ten}
              </span>
            </div>
            <Menu
              theme={"light"}
              mode="inline"
              items={items}
              className="ms-4"
            />
          </div>
          <div
            className="box-user-right col-sm-8 p-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <Outlet context={[customer, setCustomer]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
