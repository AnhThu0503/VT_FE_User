import "./BlogDetail.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Avatar } from "antd";
const key = "updatable";

const BlogDetail = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
  const [falg, setFalg] = useState(false);

  const getFirstLetterOfLastName = (fullName) => {
    if (!fullName) return ""; // Trả về chuỗi rỗng nếu không có họ tên
    const nameParts = fullName.split(" "); // Tách chuỗi thành mảng các từ
    const lastName = nameParts[nameParts.length - 1]; // Lấy từ cuối cùng trong mảng
    return lastName.charAt(0).toUpperCase(); // Trả về ký tự đầu tiên của từ cuối cùng
  };

  const handleReplyButtonClick = (commentId, ND_email) => {
    console.log("commentId", commentId);
    setTraLoiBL(ND_email + "   ");
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
  }, [falg]);

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
      if (!user.ND_id) {
        messageApi.open({
          type: "warning",
          content: "Vui lòng đăng nhập để tiến hành bình luận!",
        });
        return;
      }

      if (!binhluan.trim()) {
        messageApi.open({
          type: "warning",
          content: "Vui lòng nhập nội dung bình luận!",
        });
        return;
      }

      const response = await axios.post("/api/blog/comment", {
        ND_id: user.ND_id,
        B_id: id,
        BLB_noiDung: binhluan,
        BLB_ngayBL: getCurrentDate(),
        BLB_reply: 0,
      });

      if (response.status === 200) {
        setFalg(!falg);
        messageApi.open({
          type: "success",
          content: "Bình luận thành công!",
        });
        setBinhLuan("");
        setReplyInputVisibleForComment(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyComment = async (BLB_id) => {
    try {
      if (!user.ND_id) {
        messageApi.open({
          type: "warning",
          content: "Vui lòng đăng nhập để tiến hành bình luận!",
        });
        if (!traloiBL) {
          messageApi.open({
            type: "warning",
            content: "Vui lòng nhập nôi dung bình luận!",
          });
        }
        return;
      }
      const data = {
        ND_id: user.ND_id,
        B_id: id,
        BLB_id: BLB_id,
        BLB_noiDung: traloiBL,
        BLB_ngayBL: getCurrentDate(),
      };
      const response = await axios.post("/api/blog/comment/reply", data);

      if (response.status === 200) {
        setFalg(!falg);

        messageApi.open({
          type: "success",
          content: "Trả lời luận thành công!",
        });
        setTraLoiBL("");
        setReplyInputVisibleForComment(0);
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
  const avatarColors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#007bff"];

  // Hàm để chọn một màu nền từ mảng avatarColors dựa trên ND_ten
  const getAvatarColor = (ND_id) => {
    const index = Math.abs(ND_id % avatarColors.length);
    return avatarColors[index];
  };

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
                        Đăng bình luận
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="display-comments mt-4"
                  style={{
                    height: "400px",
                    maxHeight: "400px",
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
                          <div className="d-flex">
                            <Avatar
                              className="mt-4 me-2"
                              style={{
                                backgroundColor: getAvatarColor(comment.ND_id),
                              }}
                            >
                              {getFirstLetterOfLastName(comment.ND_ten)}
                            </Avatar>
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
                          </div>

                          <p
                            className="p-0 m-0 ms-4 ps-3 reply"
                            onClick={() =>
                              handleReplyButtonClick(
                                comment.BLB_id,
                                comment.ND_email
                              )
                            }
                          >
                            Trả lời
                          </p>
                          {replyInputVisibleForComment === comment.BLB_id && (
                            <div className=" ms-4 ps-3">
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
                                Gửi
                              </Button>
                            </div>
                          )}
                          {/* Display replies */}
                          {comment.replies && (
                            <div className=" mt-3 ms-4 ps-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.BLB_id}>
                                  <div className="d-flex">
                                    <Avatar
                                      className="mt-4 me-2"
                                      style={{
                                        backgroundColor: getAvatarColor(
                                          reply.ND_id
                                        ),
                                      }}
                                    >
                                      {getFirstLetterOfLastName(reply.ND_ten)}
                                    </Avatar>
                                    <div
                                      className="mb-2 px-4 py-2"
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
                                        {formatDate(reply.BLB_ngayBL)}
                                      </p>
                                      <p
                                        className="p-0 m-0"
                                        style={{
                                          color: "#333",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {reply.BLB_noiDung}
                                      </p>
                                    </div>
                                  </div>
                                  <p
                                    className="p-0 m-0 ms-4 ps-3 reply"
                                    onClick={() =>
                                      handleReplyButtonClick(
                                        reply.BLB_id,
                                        reply.ND_email
                                      )
                                    }
                                  >
                                    Trả lời
                                  </p>
                                  {replyInputVisibleForComment ===
                                    reply.BLB_id && (
                                    <div className="mt-3 ms-4 ps-3">
                                      <TextArea
                                        type="text"
                                        placeholder="Your reply..."
                                        value={traloiBL}
                                        className="mb-4"
                                        size="large"
                                        style={{ width: "250px" }}
                                        onChange={(e) => {
                                          setTraLoiBL(e.target.value);
                                        }}
                                      />
                                      <Button
                                        className="ms-2 mb-4"
                                        onClick={() => {
                                          handleReplyComment(comment.BLB_id);
                                        }}
                                      >
                                        Gửi
                                      </Button>
                                    </div>
                                  )}
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
      {contextHolder}
    </div>
  );
};
export default BlogDetail;
