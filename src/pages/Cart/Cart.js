import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Cart.scss";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { notification, Select } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Input, Radio, Space } from "antd";
import PayPal from "../../assets/Banner/PayPal-logo.png";
import thanhtoan from "../../assets/Banner/deliver2.webp";

import { BsFillPersonFill } from "react-icons/bs";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BsFillPhoneVibrateFill } from "react-icons/bs";

const key = "updatable";
const Cart = () => {
  const [api, contextHolder] = notification.useNotification();
  const { user, setCart } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [sum_price, setSumPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [numberProduct, setNumberProduct] = useState(1);

  useEffect(() => {
    if (user?.ND_id) {
      getItemCart();
    }
  }, [user.ND_id]);

  useEffect(() => {
    console.log("run_____");
    getItemCart();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/customer/infor", {
          ND_id: user?.ND_id,
        });
        console.log("goi api user", response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
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

  const addToCard = async (id, numberProduct) => {
    try {
      const response = await axios.post("/api/cart/add", {
        SP_id: id,
        ND_id: user.ND_id,
        numberProduct: numberProduct,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = async (item_id, id_product) => {
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
        const updatedProducts = products.filter(
          (item) => item.SPGH_id !== item_id
        );
        setProducts(updatedProducts);
        setCart(sumCart(updatedProducts));
      } else {
        api.open({
          key,
          type: "error",
          message: "Xóa sản phẩm không thành công",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createOrder = async () => {
    if (value == 2) {
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
          setCart(0);
          getItemCart();
          api.open({
            key,
            type: "success",
            message: "Đặt hàng thành công",
          });
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

  const handleAdd = (index, id_product) => {
    // Create a copy of the products array
    const updatedProducts = [...products];

    // Update the soLuong property of the product at the specified index
    updatedProducts[index] = {
      ...updatedProducts[index],
      soLuong: updatedProducts[index].soLuong + 1,
    };
    // console.log("11", products[index].SPGH_id);
    if (updatedProducts[index].soLuong >= 10) {
      api.open({
        key,
        type: "error",
        message: "Số lượng sản phẩm tối đa là 9",
      });
      return;
    } else {
      addToCard(id_product, 1);
      setCart(sumCart(updatedProducts));
    }
    // Set the state with the updated array
    setProducts(updatedProducts);
  };

  const sumCart = (products) => {
    let sum = 0;
    products.map((item) => {
      sum += item.soLuong;
    });
    return sum;
  };

  const handleDelete = (index, id_product) => {
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
    } else {
      addToCard(id_product, -1);
      setCart(sumCart(updatedProducts));
    }
    // Set the state with the updated array
    setProducts(updatedProducts);
  };

  return (
    <div className="cart-background mx-3 " style={{ paddingTop: "4.5rem" }}>
      {/* <Nav /> */}
      {contextHolder}

      <div
        className="container-fluid p-4 mt-2"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h3>Giỏ hàng</h3>
        <div className="table-responsive">
          <table className="table table-light  mt-2">
            <thead>
              <tr>
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
                            handleDelete(idx, item.SP_id);
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
                            handleAdd(idx, item.SP_id);
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
                        className="btn  btn-danger"
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
          <div className="d-flex pb-4">
            <div
              className=" px-2 me-4 py-2"
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            >
              <p className="p-0 m-0 mb-2 hinhthucthanhtoan ">
                Thông tin giao hàng
              </p>
              <div className="mx-2">
                <BsFillPersonFill
                  className="fs-4 mb-1 me-2"
                  style={{ color: "#ccc" }}
                />
                {user.ND_ten}
              </div>

              <div className="my-2 mx-2">
                <BsFillPhoneVibrateFill
                  className="fs-4 mb-1 me-2"
                  style={{ color: "#ccc" }}
                />
                {user.ND_SDT}
              </div>

              <div className="mx-2">
                <BsFillGeoAltFill
                  className="fs-4 mb-1 me-2"
                  style={{ color: "#ccc" }}
                />
                {user.ND_diaChi}
              </div>
            </div>
            <div
              className="px-2"
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            >
              <p className="p-0 m-0 mb-2 mt-2 hinhthucthanhtoan">
                Hình thức thanh toán
              </p>
              {/* phuong thuc thanh toan */}
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1} style={{ width: "280px" }} className="ps-1">
                    <img
                      className="mb-1 mt-1 me-2"
                      src={thanhtoan}
                      style={{ height: "40px", width: "50px" }}
                    />
                    Thanh toán khi nhận hàng
                  </Radio>
                  <Radio
                    value={2}
                    style={{ width: "280px" }}
                    className="ps-1 p-1  me-2"
                  >
                    <img
                      className=" mb-2"
                      src={PayPal}
                      style={{ height: "30px", width: "80px" }}
                    />
                    Thanh toán PayPal
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>

          <div>
            <div className="d-flex me-4" style={{ justifyContent: "end" }}>
              <p className=" me-2">Tổng tiền: </p>
              <p className=" " style={{ color: "#e64906", fontWeight: "600" }}>
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
                    // Kiểm tra nếu người dùng có địa chỉ
                    user?.ND_SDT ? (
                      // Kiểm tra nếu người dùng đã có số điện thoại
                      <div className="text-end">
                        <button
                          className="btn btn-payment"
                          onClick={createOrder}
                          style={{ width: "170px" }}
                        >
                          Đặt hàng
                        </button>
                      </div>
                    ) : (
                      // Nếu người dùng chưa có số điện thoại, yêu cầu cập nhật
                      <div className="text-end ">
                        <Link to="/account" className="update-address">
                          Cập nhật số điện thoại để thanh toán
                        </Link>
                      </div>
                    )
                  ) : (
                    // Nếu người dùng chưa có địa chỉ, yêu cầu cập nhật địa chỉ
                    <div className="text-end ">
                      <Link to="/account/address" className="update-address">
                        Cập nhật địa chỉ để thanh toán
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Hiển thị loader nếu dữ liệu người dùng đang được tải
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
