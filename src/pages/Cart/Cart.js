import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Cart.scss";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { notification, Select } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const key = "updatable";
const Cart = () => {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [sum_price, setSumPrice] = useState(0);
  const [payment, setPayment] = useState("trucTiep");
  const [numberProduct, setNumberProduct] = useState(1);

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
        numberProduct: numberProduct,
      });
      setProducts(response.data);
      caculateTotal(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const caculateTotal = (data) => {
    var sum = 0;
    data.forEach((item) => {
      sum +=
        (item.discount
          ? item.G_thoiGia - item.discount.KM_mucGiamGia
          : item.G_thoiGia) * item.soLuong;
    });
    setSumPrice(sum);
  };

  useEffect(() => {
    caculateTotal(products);
  }, [products]);

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
          type: "success",
          message: "Xóa sản phẩm thành công",
        });
        setProducts(products.filter((item) => item.SPGH_id !== item_id));
        window.location.reload();
      } else {
        api.open({
          key,
          type: "success",
          message: "Xóa sản phẩm không thành công",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createOrder = async () => {
    if (payment === "online") {
      try {
        const response = await axios.post("/api/order/check", {
          sanpham: products,
        });

        if (response.data) {
          const online = await makePayment();
          const onlinePayment = {
            ND_id: user?.ND_id,
            tongtien: sum_price,
            trangthai: "Chờ xác nhận",
            PTTT: "Thanh toán Online",
            sanpham: products,
          };
          localStorage.setItem("orders", JSON.stringify(onlinePayment));
        } else {
          api.open({
            key,
            type: "error",
            message: "Số lượng sản phẩm vượt quá số lượng trong kho",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post("/api/order", {
          ND_id: user?.ND_id,
          tongtien: sum_price,
          trangthai: "Chờ xác nhận ",
          PTTT: "Thanh Toán khi nhận hàng",
          sanpham: products,
        });
        if (response) {
          window.location.reload();
        }
      } catch (error) {
        if (
          error.response.data.error === "Product quantity is not sufficient"
        ) {
          api.open({
            key,
            type: "error",
            message: "Số lượng sản phẩm vượt quá số lượng trong kho",
          });
        }
      }
    }
  };

  const handleChange = (value) => {
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

  const handleAdd = (index) => {
    // Create a copy of the products array
    const updatedProducts = [...products];

    // Update the soLuong property of the product at the specified index
    updatedProducts[index] = {
      ...updatedProducts[index],
      soLuong: updatedProducts[index].soLuong + 1,
    };

    if (updatedProducts[index].soLuong >= 10) {
      api.open({
        key,
        type: "error",
        message: "Số lượng sản phẩm tối đa là 9",
      });
      return;
    }
    // Set the state with the updated array
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    // Create a copy of the products array
    const updatedProducts = [...products];

    // Update the soLuong property of the product at the specified index
    updatedProducts[index] = {
      ...updatedProducts[index],
      soLuong: updatedProducts[index].soLuong - 1,
    };

    if (updatedProducts[index].soLuong <= 0) {
      api.open({
        key,
        type: "error",
        message: "Số lượng sản phẩm tối thiểu là 1",
      });
      return;
    }
    // Set the state with the updated array
    setProducts(updatedProducts);
  };

  return (
    <div className="cart-background my-4" style={{ paddingTop: "4.5rem" }}>
      {/* <Nav /> */}

      <div className="container p-4" style={{ backgroundColor: "#ffffff" }}>
        <h3>Giỏ hàng</h3>
        <div className="table-responsive ">
          <table className="table table-light p-4 mt-2">
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
                    <td style={{ verticalAlign: "middle" }}>
                      {item.SP_ten}, {item.SP_trongLuong} {item.SP_donViTinh}
                    </td>

                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      <div style={{ verticalAlign: "middle" }}>
                        {item.discount && (
                          <del
                            style={{
                              color: "#787878",
                              verticalAlign: "middle",
                            }}
                          >
                            {item.G_thoiGia.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </del>
                        )}
                        <p
                          className="card-text item-price"
                          style={{ verticalAlign: "middle" }}
                        >
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
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="input-group ega-qty-control">
                        <div
                          className="input-group-addon cursor-pointer"
                          onClick={() => {
                            handleDelete(idx);
                          }}
                        >
                          -
                        </div>
                        <input
                          type="text"
                          className="text-center form-control"
                          maxLength={5}
                          name="quantity"
                          value={item.soLuong}
                          id="exampleInputAmount"
                        />
                        <div
                          className="input-group-addon cursor-pointer"
                          onClick={() => {
                            handleAdd(idx);
                          }}
                          style={{ marginLeft: "-10px" }}
                        >
                          +
                        </div>
                      </div>
                    </td>
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
                    <td
                      style={{ verticalAlign: "middle" }}
                      className="text-end"
                    >
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
                <td colSpan={8}>
                  <Link to="/" className="btn-tieptucmuahang">
                    <ArrowLeft /> Tiếp tục mua hàng
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="">
              {/* phuong thuc thanh toan */}
              <Select
                defaultValue="Thanh toán trực tiếp"
                className=""
                size="large"
                style={{ width: 190 }}
                onChange={handleChange}
                options={[
                  { value: "trucTiep", label: "Thanh toán trực tiếp" },
                  { value: "online", label: "Thanh toán online" },
                ]}
              />
            </div>
            <div className="d-flex">
              <p className="border border-1 border-secondary p-2">
                Tổng thanh toán
              </p>
              <p
                className="border border-1 border-secondary p-2"
                style={{ color: "#e64906", fontWeight: "600" }}
              >
                {sum_price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
          <div>
            {user?.ND_id ? (
              <div>
                <div>
                  {user?.ND_diaChi ? (
                    <div className="text-end">
                      <button
                        className="btn btn-payment"
                        onClick={createOrder}
                        style={{ width: "216px" }}
                      >
                        Thanh toán
                      </button>
                    </div>
                  ) : (
                    <div className="text-end ">
                      <Link to="/account/address" className="update-address">
                        Cập nhật địa chỉ để thanh tóan
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="box-loader">
                <span className="loader"></span>
              </div>
            )}
          </div>
        </div>
      </div>
      {contextHolder}
      {/* <Footer /> */}
    </div>
  );
};
export default Cart;
