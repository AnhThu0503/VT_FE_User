import React, { useContext, useEffect, useState } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import logo3 from "../../assets/logo/logo3.png";
import { Cart3, PersonFill } from "react-bootstrap-icons";
import { MdOutlineLogout } from "react-icons/md";

import axios from "axios";
import { UserContext } from "../../context/userContext";

const Nav = ({ flag, setFlag }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [categorys, setCategorys] = useState([]);
  const [sum_item_cart, setSumItemCart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSeach, setIsSeach] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllCategory();
    if (user?.ND_id) {
      getSumItemCart();
    }
  }, [user.ND_id]);

  useEffect(() => {
    setFlag(!flag);
  }, [token]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get("/api/categorys");
      setCategorys(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getSumItemCart = async () => {
    try {
      const response = await axios.get("/api/cart/sum", {
        params: {
          ND_id: user.ND_id,
        },
      });
      if (response.data) {
        setSumItemCart(response.data);
      } else {
        setSumItemCart(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSearchValue = async (value) => {
    try {
      if (value) {
        const response = await axios.post("/api/products/search", {
          SP_ten: value,
        });
        if (response.data.length > 0) {
          console.log("abc>>>>>>>>>>>", response.data);
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className=" navbar navbar-expand-lg navbar-light fixed-top py-2">
        <div className=" container">
          <Link className="navbar-brand" to="/">
            <img src={logo3} style={{ width: "4.5rem", height: "3rem" }}></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ flexGrow: "1" }}
            >
              <li className="nav-item dropdown ms-3 me-3 mt-1">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh sách sản phẩm
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li style={{ borderBottom: "1px solid #67666638" }}>
                    <Link to="/product-all" className="dropdown-item">
                      Tất cả sản phẩm
                    </Link>
                  </li>
                  {categorys &&
                    categorys.map((category) => (
                      <li
                        key={category.DMSP_id}
                        style={{ borderBottom: "1px solid #67666638" }}
                      >
                        <Link
                          to={`/products/${category.DMSP_id}`}
                          className="dropdown-item"
                        >
                          {category.DMSP_ten}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li
                className="nav-item ms-4 me-4"
                style={{
                  flexGrow: "1",
                }}
              >
                <form className="d-flex form-search">
                  <input
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      handleSearchValue(e.target.value);
                    }}
                    onFocus={() => setIsSeach(true)}
                    className="form-control me-2 pt-2 pb-2"
                    style={{ flexGrow: "1" }}
                    type="search"
                    placeholder="Tìm kiếm sản phẩm"
                    aria-label="Search"
                  />
                  {/* <Search /> */}
                  {isSeach && (
                    <div
                      id="inputSearch"
                      style={{
                        width: "98%",
                        height: "21rem",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        boxShadow: "1px 2px 3px solid #000",
                        position: "absolute",
                        zIndex: "10",
                        top: "2.6rem",
                        maxHeight: "21rem",
                        // overflow: "auto",
                        overflow: "hidden",
                        overflowY: "scroll",
                      }}
                    >
                      {products.length <= 0 ? (
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "10rem",
                            fontSize: "1.4rem",
                            fontWeight: "600",
                          }}
                        >
                          Không tìm thấy sản phẩm !
                        </div>
                      ) : (
                        <div>
                          {products.length > 0 &&
                            products.map((product, index) => (
                              <Link
                                to={`/product/${product.SP_id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#333",
                                }}
                                onClick={() => {
                                  setIsSeach(false);
                                }}
                              >
                                <div
                                  className="display-product-search p-2"
                                  key={index}
                                  style={{
                                    width: "90%",
                                    display: "flex",

                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    margin: "10px auto",
                                    borderRadius: "8px",
                                    boxShadow: "1px 2px 3px #ccc",
                                  }}
                                >
                                  <div
                                    className="d-flex"
                                    style={{
                                      width: "100%",
                                    }}
                                  >
                                    <div>
                                      <img
                                        style={{
                                          height: "4.5rem",
                                          width: "6rem",
                                        }}
                                        src={product.first_image}
                                        alt={`Product ${index + 1}`}
                                        className="product-image"
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <span
                                        style={{
                                          fontSize: "18px",
                                          color: "#787878",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {product.SP_ten}
                                      </span>
                                      <div className="pb-2">
                                        {product && product.km_mucGiamGia && (
                                          <del
                                            style={{ color: "#787878" }}
                                            className="me-1"
                                          >
                                            {product.price.toLocaleString(
                                              "vi",
                                              {
                                                style: "currency",
                                                currency: "VND",
                                              }
                                            )}
                                          </del>
                                        )}
                                        <p
                                          className="p-0 m-0 product-price"
                                          style={{
                                            color: "#e64906",
                                            fontSize: "16px",
                                          }}
                                        >
                                          {product.km_mucGiamGia
                                            ? (
                                                product.price -
                                                product.km_mucGiamGia
                                              ).toLocaleString("vi", {
                                                style: "currency",
                                                currency: "VND",
                                              })
                                            : product.price.toLocaleString(
                                                "vi",
                                                {
                                                  style: "currency",
                                                  currency: "VND",
                                                }
                                              )}
                                        </p>
                                      </div>
                                      <p
                                        className="p-0 m-0"
                                        style={{
                                          fontSize: "16px",
                                          color: "#787878",
                                        }}
                                      >
                                        Trọng lượng: {product.SP_trongLuong}{" "}
                                        {product.SP_donViTinh}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </li>

              <li className="nav-item ">
                <Link className="nav-link btn mt-1" to="/blog">
                  Blog
                </Link>
              </li>
              {user.ND_id ? (
                <>
                  <li className="nav-item ms-3 me-3">
                    <Link className="nav-link btn nav-item-cart" to="/cart">
                      {" "}
                      <Cart3 className="fs-5" />
                      <span>{sum_item_cart}</span>{" "}
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Link className="nav-link btn" to="/account">
                      <PersonFill className="fs-4 me-1" />
                    </Link>
                    <Link className="nav-link btn mt-1" onClick={handleLogout}>
                      {user.ND_ten}
                      <MdOutlineLogout className="fs-5 ms-1 " />
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item mt-1">
                  <Link className="nav-link btn btn-login " to="/login">
                    Đăng nhập
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {isSeach && (
          <div
            onClick={() => {
              setIsSeach(false);
            }}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              zIndex: "2",
              height: "120vh",
              backgroundColor: "transparent",
            }}
          ></div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
