import axios from "axios";
import "./Success.scss";
import { BsCheckCircleFill } from "react-icons/bs";
import { Button } from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";

const Success = () => {
  const { getCart, setCart } = useContext(UserContext);
  useEffect(() => {
    // setCart(0);
    const orders = JSON.parse(localStorage.getItem("orders"));

    if (orders) {
      (async () => {
        console.log(orders);

        const response = await axios.post("/api/order", orders);
        console.log(response);
        if (response) {
          getCart();
          localStorage.removeItem("orders");
        }
      })();
    }
  }, []);
  return (
    <div
      className="container-fluid success-background "
      style={{
        paddingTop: "4.5rem",
        marginBottom: "5rem",
        paddingBottom: "10rem",
      }}
    >
      <div className="container">
        <div
          className="col-sm-6 success-container mx-auto p-4 "
          style={{ height: "300px" }}
        >
          <div
            className=" mx-auto text-center"
            style={{
              fontSize: "24px",
              color: "#666666",
              fontFamily: "sans-serif",
            }}
          >
            Bạn đã thanh toán thành công
          </div>
          <div className=" mx-auto text-center mt-4">
            <BsCheckCircleFill style={{ fontSize: "5rem", color: "#00ba00" }} />
          </div>
          <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
            <Link to="/" className="me-2">
              <Button className="btn-login " size="large">
                Trang chủ
              </Button>
            </Link>
            <Link to="/account/order" className="ms-2">
              <Button className="btn-login  " size="large">
                Đơn hàng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
