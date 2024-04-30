import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { ChevronRight } from "react-bootstrap-icons";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import sale from "../../assets/logo/sale.gif";
import best from "../../assets/logo/200w.gif";
import best1 from "../../assets/logo/Best1.png";

import tag from "../../assets/logo/313392-middle.png";

import { Rate } from "antd";
const HomePage = (props) => {
  const [categorys, setCategorys] = useState([]);
  const [productsDiscount, setProductsDiscount] = useState([]);
  const [productsBestseller, setProductsBestseller] = useState([]);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    getProductsHome();
    getProductDiscount();
    getAllProductBanChay();
  }, []);
  const getAllProductBanChay = async () => {
    try {
      const response = await axios.get("/api/products-bestseller");
      setProductsBestseller(response.data);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
    }
  };
  const getProductDiscount = async () => {
    try {
      const response = await axios.get("/api/products-discount");
      console.log("----------------response:", response.data);
      setProductsDiscount(response.data.products);
    } catch (error) {
      console.error("Error fetching products discount:", error);
    }
  };
  const getProductsHome = async () => {
    try {
      const response = await axios.get("/api/products-home");
      setCategorys(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="container-fluid homepage-background "
      style={{ paddingTop: "4.5rem" }}
    >
      {/* <Nav /> */}
      <div className="container homepage-container">
        <Banner />
        <div>
          <div className="container section-container p-5 my-3">
            <div className="section-header d-flex mb-4">
              <div className="d-flex">
                {/* <span className="section-title  me-2 mt-1">
                  Sản phẩm bán chạy
                </span> */}
                <div className="section-title-2">
                  <h3 className={"text-rainbow-animation"}>
                    Sản phẩm bán chạy
                  </h3>
                </div>
                <img
                  className=""
                  src={best1}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            </div>
            <div className="section-body row">
              {productsBestseller.products &&
                productsBestseller.products.map((product) => (
                  <div className="col-sm-3 section-item" key={product.SP_id}>
                    <Link
                      to={`/product/${product.SP_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card custom-product col-sm-12 d-flex"
                        style={{ height: "100%" }}
                      >
                        <img
                          src={product.image}
                          className="card-img-top product-img"
                          alt="..."
                        />
                        <h5 className="card-title product-name">
                          {product.SP_ten}
                        </h5>
                        <p
                          className=" product-weight "
                          style={{ color: "#333" }}
                        >
                          Trọng lượng: {product.SP_trongLuong}{" "}
                          {product.SP_donViTinh}
                        </p>
                        <div className="pb-2">
                          {product.discount &&
                            product.discount.KM_mucGiamGia && (
                              <del
                                style={{ color: "#787878" }}
                                className="me-1"
                              >
                                {product.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </del>
                            )}
                          <span className="card-text product-price">
                            {product.discount
                              ? (
                                  product.price - product.discount.KM_mucGiamGia
                                ).toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : product.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <div />
          </div>
        </div>
        <div>
          <div className="container section-container p-5 my-3">
            <div className="section-header d-flex mb-4">
              <div className="d-flex">
                {/* <span className="section-title mt-2 me-2">
                  Sản phẩm khuyến mãi
                </span> */}
                <div className="section-title-2 mt-1">
                  <h3 className={"text-rainbow-animation"}>
                    Sản phẩm khuyến mãi
                  </h3>
                </div>

                <img
                  className=""
                  src={sale}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <Link className="section-btn" to={`/product-all-discount`}>
                Tất cả sản phẩm <ChevronRight />
              </Link>
            </div>
            <div className="section-body row">
              {productsDiscount &&
                productsDiscount.map((product) => (
                  <div className="col-sm-3 section-item" key={product.SP_id}>
                    <Link
                      to={`/product/${product.SP_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card custom-product col-sm-12 d-flex"
                        style={{ height: "100%" }}
                      >
                        <img
                          src={product.image}
                          className="card-img-top product-img"
                          alt="..."
                        />
                        <h5 className="card-title product-name">
                          {product.SP_ten}
                        </h5>
                        <p
                          className=" product-weight "
                          style={{ color: "#333" }}
                        >
                          Trọng lượng: {product.SP_trongLuong}{" "}
                          {product.SP_donViTinh}
                        </p>
                        <div className="pb-2">
                          {product.discount &&
                            product.discount.KM_mucGiamGia && (
                              <del
                                style={{ color: "#787878" }}
                                className="me-1"
                              >
                                {product.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </del>
                            )}
                          <span className="card-text product-price">
                            {product.discount
                              ? (
                                  product.price - product.discount.KM_mucGiamGia
                                ).toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : product.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <div />
          </div>
        </div>
        <div>
          {categorys &&
            categorys.map((category) => (
              <div
                key={category.DMSP_id}
                className="container section-container p-5 my-3"
              >
                <div className="section-header d-flex mb-4">
                  <span className="section-title">{category.DMSP_ten}</span>
                  <Link
                    to={`/products/${category.DMSP_id}`}
                    className="section-btn"
                  >
                    Tất cả sản phẩm <ChevronRight />
                  </Link>
                </div>
                <div className="section-body row">
                  {category.products.map((product) => (
                    <div className="col-sm-3 section-item" key={product.SP_id}>
                      <Link
                        to={`/product/${product.SP_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="card custom-product col-sm-12 d-flex"
                          style={{ height: "100%" }}
                        >
                          <img
                            src={product.image}
                            className="card-img-top product-img"
                            alt="..."
                          />
                          <h5 className="card-title product-name">
                            {product.SP_ten}
                          </h5>
                          <p
                            className=" product-weight "
                            style={{ color: "#333" }}
                          >
                            Trọng lượng: {product.SP_trongLuong}{" "}
                            {product.SP_donViTinh}
                          </p>
                          <div className="pb-2">
                            {product.discount &&
                              product.discount.KM_mucGiamGia && (
                                <del
                                  style={{ color: "#787878" }}
                                  className="me-1"
                                >
                                  {product.price.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </del>
                              )}
                            <span className="card-text product-price">
                              {product.discount
                                ? (
                                    product.price -
                                    product.discount.KM_mucGiamGia
                                  ).toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })
                                : product.price.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div />
              </div>
            ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default HomePage;
