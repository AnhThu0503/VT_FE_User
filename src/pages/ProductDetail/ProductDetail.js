import React, { useState, useEffect, useContext } from "react";
import "./ProductDetail.scss";
import { CaretRightFill } from "react-bootstrap-icons";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { UserContext } from "../../context/userContext";
import { Rate } from "antd";
const ProductDetail = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [numberProduct, setNumberProduct] = useState(1);
  const [commnet, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const key = "updatable";
  const [api, contextHolder] = notification.useNotification();
  const [numberStar, setNumberstar] = useState([]);
  useEffect(() => {
    getProduct();
    getComments();
  }, [location]);

  const getComments = async () => {
    try {
      const response = await axios.get("/api/comments", {
        params: { SP_id: id },
      });
      console.log(response.data);
      if (response.data) setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get("/api/product", {
        params: { SP_id: id },
      });
      setProduct(response.data.product);
      setProducts(response.data.relate_products);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCard = async () => {
    try {
      const response = await axios.post("/api/cart/add", {
        SP_id: id,
        ND_id: user.ND_id,
        numberProduct: numberProduct,
      });
      if (response.data) {
        api.open({
          key,
          type: "success",
          message: "Thêm sản phẩm vào giỏ hàng thành công",
        });
        window.location.href = `/product/${id}`;
      } else {
        api.open({
          key,
          type: "error",
          message: "Thêm sản phẩm vào giỏ hàng thất bại",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = () => {
    const newNumber = numberProduct + 1;
    if (newNumber >= 10) {
      api.open({
        key,
        type: "error",
        message: "Số lượng sản phẩm không được lớn hơn 9",
      });
    } else {
      setNumberProduct(newNumber);
    }
  };

  const handleDelete = () => {
    const newNumber = numberProduct - 1;
    if (newNumber === 0) {
      api.open({
        key,
        type: "error",
        message: "Số lượng sản phẩm tối thiểu là 1",
      });
    } else {
      setNumberProduct(newNumber);
    }
  };

  const handeCommnet = async () => {
    try {
      const response = await axios.post("/api/users/comment", {
        SP_id: id,
        ND_id: user.ND_id,
        sosao: numberStar,
        noidung: commnet,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(dateObject) {
    const date = new Date(dateObject);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits, pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <div
        className="container-fluid productdetail-background"
        style={{ paddingTop: "4.5rem" }}
      >
        {/* <Nav /> */}
        <div className="container productdetail-container my-4 px-4">
          <div className="row ">
            <div className="col-12 col-sm-12 col-md-9 item-left p-4">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <img
                        key={1}
                        src={product?.images ? product.images[0].HA_URL : ""}
                        alt="Hình ảnh sản phẩm"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div
                      className="d-flex mt-4  list-product col-md-12"
                      style={{
                        height: "100px",
                        overflow: "hidden",
                        width: "100%",
                        overflowX: "scroll",
                      }}
                    >
                      {product?.images &&
                        product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image.HA_URL}
                            style={{ height: "100%" }}
                            className="me-2 img-fluid"
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6">
                  <h3 className="product-titlle">
                    {product.SP_ten} {product.SP_trongLuong}{" "}
                    {product.SP_donViTinh}
                  </h3>
                  {product.discount && product?.SP_gia && (
                    <del style={{ color: "#787878" }}>
                      {product.SP_gia.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </del>
                  )}
                  <h4 className="product-price">
                    {product?.SP_gia
                      ? (product.discount
                          ? product.SP_gia - product.discount.KM_mucGiamGia
                          : product.SP_gia
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0}
                  </h4>
                  <div className="input-group ega-qty-control">
                    <div
                      onClick={handleDelete}
                      className="input-group-addon cursor-pointer"
                    >
                      -
                    </div>
                    <input
                      type="text"
                      className="text-center form-control"
                      name="quantity"
                      maxLength={4}
                      id="exampleInputAmount"
                      value={numberProduct}
                    />
                    <div
                      onClick={handleAdd}
                      className="input-group-addon cursor-pointer "
                    >
                      +
                    </div>
                  </div>
                  <button className="btn btn-add-cart my-3" onClick={addToCard}>
                    Thêm vào giỏ hàng
                  </button>
                  <div className="product-description ">
                    <div className="d-flex">
                      <CaretRightFill
                        style={{ color: "#FF4D00" }}
                        className="mt-2"
                      />
                      <h4
                        className="product-description-title"
                        style={{
                          fontSize: "20px",
                          textAlign: "center",
                          fontFamily: "inherit",
                          fontWeight: "500",
                          color: "inherit",
                        }}
                      >
                        Mô tả sản phẩm
                      </h4>
                    </div>

                    <div
                      style={{
                        color: "#666666",
                        fontSize: "16px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {product.SP_moTa}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-4">
                <div className="">
                  <h3
                    className="box-comment-title"
                    style={{
                      fontSize: "20px",

                      fontFamily: "inherit",
                      fontWeight: "500",
                      color: "inherit",
                    }}
                  >
                    Bình luận
                  </h3>
                  <div className="box-comment-body d-flex flex-column">
                    <textarea
                      value={commnet}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder="Mời bạn để lại bình luận"
                      className="d-block p-3 "
                    ></textarea>
                    <Rate
                      className="mt-3"
                      allowHalf
                      defaultValue={numberStar}
                      onChange={(e) => {
                        setNumberstar(e);
                      }}
                    />
                    <div className="text-end">
                      <button
                        className="btn btn-comment mt-3"
                        onClick={handeCommnet}
                      >
                        Tải bình luận
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="display-comments mt-4"
                  style={{
                    height: "300px",
                    maxHeight: "300px",
                    marginTop: "20px",
                    overflow: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <h3
                    className="box-comment-title"
                    style={{
                      fontSize: "20px",
                      marginBottom: "2rem",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      color: "#337ab7",
                    }}
                  >
                    Tất cả đánh giá
                  </h3>
                  {comments &&
                    comments.map((comment, index) => {
                      return (
                        <>
                          <div className="comment mb-4" key={index}>
                            <div
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <h6 className="m-0">{comment.ND_email}</h6>
                              <p
                                style={{ color: "#333", fontSize: "18px" }}
                                className="p-0 m-0"
                              >
                                {formatDate(comment.DGSP_ngayDanhGia)}
                              </p>
                            </div>

                            <Rate
                              allowHalf
                              defaultValue={comment.DGSP_soSao}
                              style={{ fontSize: "14px" }}
                            />
                            <p style={{ color: "#333", fontSize: "18px" }}>
                              {comment.DGSP_noiDung}
                            </p>
                          </div>
                          <hr />
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-md-3 item-right d-sm-none d-md-block">
              <div className="item-right_child ms-4 p-2 row">
                <h4
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontFamily: "inherit",
                    fontWeight: "500",
                    color: "inherit",
                  }}
                  className="p-2"
                >
                  Sản phẩm liên quan
                </h4>
                {products &&
                  products.map((product) => (
                    <div
                      className="col-sm-12 d-flex flex-column align-items-center my-4"
                      key={product.SP_id}
                    >
                      <Link
                        to={`/product/${product.SP_id}`}
                        style={{ textDecoration: "none" }}
                        className="d-flex flex-column align-items-center"
                      >
                        <img
                          src={product.image}
                          alt="..."
                          style={{ width: "100%" }}
                        />
                        <p
                          style={{
                            fontSize: "18px",
                            marginBottom: 0,
                            color: "#666",
                            fontFamily: "inherit",
                          }}
                          className=""
                        >
                          {product.SP_ten}
                        </p>
                        <p
                          className="pb-0"
                          style={{
                            fontSize: "16px",
                            color: "#666",
                            fontFamily: "inherit",
                          }}
                        >
                          Trọng lượng: {product.SP_trongLuong}{" "}
                          {product.SP_donViTinh}
                        </p>
                        <div>
                          {product.discount && (
                            <del>
                              {product.price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </del>
                          )}
                          <p
                            className="card-text product-price"
                            style={{ color: "#e64906", fontWeight: "600" }}
                          >
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
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {contextHolder}
      </div>
    </div>
  );
};
export default ProductDetail;
