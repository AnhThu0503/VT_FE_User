import React, { useEffect } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Cancel = () => {
  useEffect(() => {
    const orders = localStorage.getItem("orders");
    if (orders) {
      localStorage.removeItem("orders");
    }
  }, []);
  return (
    <div
      className="container-fluid success-background my-4"
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
            Bạn đã hủy thanh toán
          </div>
          <div className=" mx-auto text-center mt-4">
            <BsFillXCircleFill style={{ fontSize: "5rem", color: "#ff0000" }} />
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="me-2">
              <Button className="btn-login " size="large">
                Trở về trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
