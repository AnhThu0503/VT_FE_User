import React, { useEffect } from "react";
import axios from "axios";

const Success = () => {
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders) {
      (async () => {
        console.log(orders);

        const response = await axios.post("/api/order", orders);
        console.log(response);
        if (response) {
          localStorage.removeItem("orders");
        }
      })();
    }
  }, []);

  return <div>Thanh toán thành công</div>;
};

export default Success;
