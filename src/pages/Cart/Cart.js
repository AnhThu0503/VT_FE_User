import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { NavLink, Link } from "react-router-dom";
import "./Cart.scss";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Button, notification, Form, Select, Input } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const key = "updatable";
const Cart = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [sum_price, setSumPrice] = useState(0);
  const [payment, setPayment] = useState("trucTiep");

  useEffect(() => {
    if (user?.ND_id) {
      getItemCart();
    }
  }, [user.ND_id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/customer/infor", {
          ND_id: user?.ND_id,
        });
        console.log("goi api", response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getItemCart = async () => {
    try {
      const response = await axios.get("/api/cart/items", {
        params: {
          ND_id: user.ND_id,
        },
      });
      setProducts(response.data);
      var sum = 0;
      response.data.forEach((item) => {
        sum +=
          (item.discount
            ? item.G_thoiGia - item.discount.KM_mucGiamGia
            : item.G_thoiGia) * item.soLuong;
      });
      setSumPrice(sum);
    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = async (item_id) => {
    try {
      const response = await axios.delete("/api/cart/item", {
        params: {
          SPGH_id: item_id,
        },
      });
      if (response.data) {
        api.open({
          key,
          message: "Xóa sản phẩm thành công",
        });
        setProducts(products.filter((item) => item.SPGH_id !== item_id));
        window.location.reload();
      } else {
        api.open({
          key,
          message: "Xóa sản phẩm không thành công",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const createOrder = async () => {
    if (payment === "online") {
      const online = await makePayment();
      const onlinePayment = {
        ND_id: user?.ND_id,
        tongtien: sum_price,
        trangthai: "Đang chuẩn bị",
        PTTT: "Thanh toán Online",
        sanpham: products,
      };
      localStorage.setItem("orders", JSON.stringify(onlinePayment));
    } else {
      try {
        const response = await axios.post("/api/order", {
          ND_id: user?.ND_id,
          tongtien: sum_price,
          trangthai: "Đang chuẩn bị",
          PTTT: "Thanh Toán khi nhận hàng",
          sanpham: products,
        });
        if (response) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setPayment(value);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OxTc1RxWukTEIoI2XVeckTJvqcoeCREO94fmm6FOOtMMYnf0vdd1UdBbjZYMAxosuHIwHPNPpPl5uOO8KkgkevF00ZrwiNZAX"
    );
    const body = {
      products: products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("/api/paymentOnline", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  console.log(products);

  return (
    <div className="cart-background my-4">
      {/* <Nav /> */}

      <div className="container p-4" style={{ backgroundColor: "#ffffff" }}>
        <h3>Giỏ hàng</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col"></th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item, idx) => (
                  <tr key={item.SP_id}>
                    <td style={{ verticalAlign: "middle" }}>{idx + 1}</td>
                    <td scope="row" style={{ verticalAlign: "middle" }}>
                      <img src={item.image} className="img-fluid img-product" />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{item.SP_ten}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <div>
                        {item.discount && (
                          <del>
                            {item.G_thoiGia.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </del>
                        )}
                        <p className="card-text item-price">
                          {item.discount
                            ? (
                                item.G_thoiGia - item.discount.KM_mucGiamGia
                              ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })
                            : item.G_thoiGia.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </p>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{item.soLuong}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      {(
                        (item.discount
                          ? item.G_thoiGia - item.discount.KM_mucGiamGia
                          : item.G_thoiGia) * item.soLuong
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <button
                        className="btn btn-delete"
                        onClick={() => removeItem(item.SPGH_id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={3}>
                  <NavLink to="/" className="btn-tieptucmuahang">
                    <ArrowLeft /> Tiếp tục mua hàng
                  </NavLink>
                </td>
                <td colSpan={3}>
                  <button className="btn btn-"></button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {user?.ND_id ? (
              <div>
                <div>{user.ND_ten}</div>
                <div>{user.ND_diaChi}</div>
              </div>
            ) : (
              <div className="box-loader">
                <span class="loader"></span>
              </div>
            )}
          </div>
          <div className="text-end">
            {/* phuong thuc thanh toan */}
            <Select
              defaultValue="Thanh toán trực tiếp"
              style={{ width: 200 }}
              onChange={handleChange}
              options={[
                { value: "trucTiep", label: "Thanh toán trực tiếp" },
                { value: "online", label: "Thanh toán online" },
              ]}
            />
            <button
              className="btn btn-payment"
              onClick={createOrder}
              style={{ width: "215px" }}
            >
              Thanh toán
            </button>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <p className="border border-1 border-secondary p-2">
              Tổng thanh toán
            </p>
            <p className="border border-1 border-secondary p-2">
              {sum_price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
      {contextHolder}
      {/* <Footer /> */}
    </div>
  );
};
export default Cart;
