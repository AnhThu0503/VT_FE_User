import "./BlogDetail.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { BsFillSendFill } from "react-icons/bs";
import { BsArrowReturnRight } from "react-icons/bs";

const BlogDetail = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [blog, setBlog] = useState();
  const [categorys, setCategorys] = useState([]);
  const { id } = useParams();
  const [b_noiDung, setb_noiDung] = useState();
  // comment
  const [binhluan, setBinhLuan] = useState();
  const [dsBinhLuan, setDsBinhLuan] = useState([]);
  const [replyInputVisibleForComment, setReplyInputVisibleForComment] =
    useState(null);

  const [traloiBL, setTraLoiBL] = useState();
  const [dsReply, setDSReply] = useState([]);
  const handleReplyButtonClick = (commentId) => {
    setReplyInputVisibleForComment(commentId);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/blog/comment", {
          params: { B_id: id },
        });
        if (response.status === 200) {
          setDsBinhLuan(response.data);
          // Check if response data and its properties exist before accessing them
          if (
            response.data &&
            response.data.comments &&
            response.data.comments.replies
          ) {
            setDSReply(response.data.comments.replies);
            console.log("dsTLBLB>>>", response.data.comments.replies);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    getBlogDetail();
  }, [location]);
  const getBlogDetail = async () => {
    try {
      const response = await axios.get("/api/blog-detail", {
        params: { B_id: id },
      });
      setBlog(response.data.blog);
      setb_noiDung(response.data.blog.B_noiDung);
      setCategorys(response.data.categorys);
    } catch (e) {
      console.error(e);
    }
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month and padding with zero if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Padding with zero if needed
    return `${year}-${month}-${day}`;
  }

  const handleSubmitComment = async () => {
    try {
      if (!user || !binhluan) {
        return;
      }

      const data = {
        ND_id: user.ND_id,
        B_id: id,
        BLB_noiDung: binhluan,
        BLB_ngayBL: getCurrentDate(),
      };
      const response = await axios.post("/api/blog/comment", data);

      if (response.status === 200) {
        alert("them thanh cong");
        setBinhLuan("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyComment = async (id) => {
    try {
      if (!user || !traloiBL) {
        return;
      }
      console.log(id);
      const data = {
        ND_id: user.ND_id,
        BLB_id: id,
        BLB_noiDung: traloiBL,
        BLB_ngayBL: getCurrentDate(),
      };
      const response = await axios.post("/api/blog/comment/reply", data);

      if (response.status === 200) {
        alert("them thanh cong");
        setTraLoiBL("");
      }
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
        className="container-fluid blog-background"
        style={{ paddingTop: "4.5rem" }}
      >
        <div className="container blog-container my-4 px-4">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-9 item-left p-4">
              <div>
                <div>{blog?.B_tieuDe ? blog.B_tieuDe : ""}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: b_noiDung,
                  }}
                />
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
                      value={binhluan}
                      onChange={(e) => setBinhLuan(e.target.value)}
                      placeholder="Mời bạn để lại bình luận"
                      className="d-block p-3 "
                    ></textarea>

                    <div className="text-end">
                      <button
                        onClick={() => {
                          handleSubmitComment();
                        }}
                        className="btn btn-comment mt-3"
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
                    Tất cả bình luận
                  </h3>
                  {dsBinhLuan &&
                    dsBinhLuan.map((comment) => {
                      return (
                        <div className="comment mb-4" key={comment.BLB_id}>
                          <div
                            className="py-2 px-4"
                            style={{
                              backgroundColor: "#f0f2f5",
                              borderRadius: "10px",
                            }}
                          >
                            <h6 className="m-0 p-0">{comment.ND_email}</h6>
                            <p
                              style={{ color: "#ccc", fontSize: "15px" }}
                              className="p-0 m-0"
                            >
                              {formatDate(comment.BLB_ngayBL)}
                            </p>

                            <p
                              className="p-0 m-0"
                              style={{ color: "#333", fontSize: "18px" }}
                            >
                              {comment.BLB_noiDung}
                            </p>
                          </div>

                          <p
                            className="p-0 m-0 ps-4 reply"
                            onClick={() =>
                              handleReplyButtonClick(comment.BLB_id)
                            }
                          >
                            Trả lời
                          </p>
                          {replyInputVisibleForComment === comment.BLB_id && (
                            <div className="mt-3 ms-4">
                              <TextArea
                                type="text"
                                placeholder="Your reply..."
                                value={traloiBL}
                                size="large"
                                style={{ width: "250px" }}
                                onChange={(e) => {
                                  setTraLoiBL(e.target.value);
                                }}
                              />
                              <Button
                                className="ms-2"
                                onClick={() => {
                                  handleReplyComment(comment.BLB_id);
                                }}
                              >
                                Send
                              </Button>
                            </div>
                          )}
                          {/* Display replies */}
                          {comment.replies && (
                            <div className=" mt-3 ms-4 ps-2">
                              {comment.replies.map((reply) => (
                                <div className="d-flex">
                                  <BsArrowReturnRight className="mt-2 me-1" />
                                  <div
                                    className="mb-2 px-4 py-2"
                                    key={reply.TLBLB_id}
                                    style={{
                                      backgroundColor: "#f0f2f5",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <h6 className="m-0 p-0">
                                      {reply.ND_email}
                                    </h6>
                                    <p
                                      style={{
                                        color: "#ccc",
                                        fontSize: "15px",
                                      }}
                                      className="p-0 m-0 "
                                    >
                                      {formatDate(reply.TLBLB_ngayBL)}
                                    </p>
                                    <p
                                      className="p-0 m-0"
                                      style={{
                                        color: "#333",
                                        fontSize: "18px",
                                      }}
                                    >
                                      {reply.TLBLB_noiDung}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
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
                  Sản phẩm gợi ý
                </h4>
                {categorys &&
                  categorys.map((product) => (
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
      </div>
    </div>
  );
};
export default BlogDetail;
