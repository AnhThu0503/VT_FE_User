import React, { useEffect } from "react";

const Cancel = () => {
  useEffect(() => {
    const orders = localStorage.getItem("orders");
    if (orders) {
      localStorage.removeItem("orders");
    }
  }, []);
  return <div>Cancel</div>;
};

export default Cancel;
