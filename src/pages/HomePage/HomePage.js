import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { ChevronRight } from "react-bootstrap-icons";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import sale from "../../assets/logo/sale.gif";
import best from "../../assets/logo/200w.gif";
import best1 from "../../assets/logo/Best1.png";
import box1 from "../../assets/Banner/organic4-icon1.png";
import box2 from "../../assets/Banner/organic2-icon2.png";
import box3 from "../../assets/Banner/organic2-icon3.png";
import box4 from "../../assets/Banner/organic2-icon4.png";
import tag from "../../assets/logo/313392-middle.png";
import bn1 from "../../assets/Products/Bn/bn1.jpg";
import bn2 from "../../assets/Products/Bn/bn2.jpg";

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
      console.log("----------------product best seller", response.data);

      setProductsBestseller(response.data);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
    }
  };
  const getProductDiscount = async () => {
    try {
      const response = await axios.get("/api/products-discount");
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
      <div className="container_0 mt-2">
        <Banner />
      </div>
      <div className="container-fluid homepage-container mt-4">
        <div>
          <div className=" section-container p-5 my-3 d-flex">
            <div className="col-sm-3 d-flex">
              <div className="col-sm-4 box-img nasa-flex jc">
                <img src={box1} className="" alt="Box 1" />
              </div>

              <div className="col-sm-8 box-text">
                <span class="box-title fs-22 nasa-bold margin-bottom-10 nasa-block">
                  Tươi sạch{" "}
                </span>
                <p className="box-desc">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-sm-3 d-flex">
              <div className="col-sm-4 box-img nasa-flex jc">
                <img src={box2} className="" alt="Box 1" />
              </div>

              <div className="col-sm-8 box-text">
                <span class="box-title fs-22 nasa-bold margin-bottom-10 nasa-block">
                  Hữu cơ{" "}
                </span>
                <p className="box-desc">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-sm-3 d-flex">
              <div className="col-sm-4 box-img nasa-flex jc">
                <img src={box3} className="" alt="Box 1" />
              </div>

              <div className="col-sm-8 box-text">
                <span class="box-title fs-22 nasa-bold margin-bottom-10 nasa-block">
                  Chất lượng{" "}
                </span>
                <p className="box-desc">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-sm-3 d-flex">
              <div className="col-sm-4 box-img nasa-flex jc">
                <img src={box4} className="" alt="Box 1" />
              </div>

              <div className="col-sm-8 box-text">
                <span class="box-title fs-22 nasa-bold margin-bottom-10 nasa-block">
                  Tự nhiên{" "}
                </span>
                <p className="box-desc">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" section-container p-5 my-3">
            <div className="section-header d-flex mb-4">
              <div className="d-flex">
                <div className="section-title-2">
                  <h3 className={"text-rainbow-animation"}>
                    Sản phẩm bán chạy
                  </h3>
                </div>
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
          <div className=" section-container p-5 my-3">
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

                {/* <img
                  className=""
                  src={sale}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                /> */}
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
        <div className="d-flex">
          <div className="col-sm-3">
            <img src={bn2} alt="" style={{ height: "auto" }} />
            <img className="mt-3" src={bn1} alt="" />
          </div>
          <div className="col-sm-9">
            {categorys &&
              categorys.map((category) => (
                <div
                  key={category.DMSP_id}
                  className=" section-container p-5 my-3"
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
                      <div
                        className="col-sm-3 section-item"
                        key={product.SP_id}
                      >
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
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default HomePage;
