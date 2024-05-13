import "./Blog.scss";
import { useState, useEffect } from "react";
import { Tree } from "antd";
import axios from "axios";
import { BsCalendar4 } from "react-icons/bs";
import dayjs from "dayjs";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";

const Blog = () => {
  const [treeData, setTreeData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  useEffect(() => {
    getAllCategory();
    getAllBlog();
    getRecentBlog();
  }, []);
  const getAllBlog = async () => {
    try {
      const response = await axios.get("/api/blogs");
      if (response.data) setBlogs(response.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getRecentBlog = async () => {
    try {
      const response = await axios.get("/api/blogs-recent");
      if (response.data) setRecentBlogs(response.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getAllCategory = async () => {
    try {
      const response = await axios.get("/api/categorys");
      var data = [
        {
          title: "Danh mục sản phẩm",
          key: "0-0",
          children: [],
        },
      ];
      response.data.forEach((item, idx) => {
        data[0].children.push({
          title: item.DMSP_ten,
          key: "0-0-" + idx,
          isLeaf: true,
        });
      });
      setTreeData(data);
    } catch (e) {
      console.error(e);
    }
  };
  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };
  const validateDate = (date) => {
    const dateString = date; // Your date string

    // Parse the date string and create a Date object
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1; // Months in JavaScript are zero-based
    const day = parseInt(dateParts[0]);
    const dateObject = new Date(year, month, day);

    // Convert the Date object to the ISO 8601 format
    const isoDateString = dateObject.toISOString();

    return isoDateString;
  };
  return (
    <div>
      <div
        className="container-fluid blog-background"
        style={{ paddingTop: "4.5rem" }}
      >
        <div className="container blog-container  py-3">
          <div className="row">
            <div
              className="box-blog col-12 col-sm-9 "
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="row">
                {blogs &&
                  blogs.map((item) => (
                    <div key={item.B_id}>
                      <Link
                        to={`/blogs/blog/${item.B_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card mb-3 ">
                          <div className="row g-0 blog-item p-2">
                            <div className="col-md-4 blog-img">
                              <img
                                src={item.image}
                                alt=""
                                style={{ width: "100%" }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body py-0 my-0 ">
                                <div className=" d-flex mb-1">
                                  <BsCalendar4
                                    className="me-2 mt-1"
                                    style={{ color: "#FF4D00" }}
                                  />
                                  <p
                                    className="p-0 m-0"
                                    style={{ fontSize: "16px", color: "#ccc" }}
                                  >
                                    {dayjs(item.B_ngayTao).format("DD-MM-YYYY")}
                                  </p>
                                </div>
                                <h5
                                  className="card-title blog-title"
                                  style={{
                                    color: "#ff4d00",
                                    fontFamily: "inherit",
                                  }}
                                >
                                  {item.B_tieuDe}
                                </h5>
                                <div>
                                  <div
                                    className="card-text blog-content"
                                    style={{ color: "#555" }}
                                    dangerouslySetInnerHTML={{
                                      __html: item.B_noiDung.substring(0, 300),
                                    }}
                                  />
                                  ...
                                </div>

                                <div className="d-flex">
                                  <BsChatFill
                                    className="mt-1 me-2"
                                    style={{ color: "#FF4D00" }}
                                  />
                                  <p
                                    className="p-0 m-0"
                                    style={{ color: "#ccc" }}
                                  >
                                    {item.comment_count}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <hr></hr>
                    </div>
                  ))}
              </div>
            </div>
            <div className="recent-blog col-sm-3 d-none d-sm-block">
              <div
                className="list-product"
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* <Tree
                  className=""
                  style={{ width: "100%" }}
                  multiple
                  defaultExpandAll
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={treeData}
                /> */}
                <div className="item-right_child mx-2 p-2 row">
                  <h4
                    className="pt-2 pb-0 mb-0"
                    style={{
                      fontSize: "20px",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      color: "inherit",
                      textTransform: "uppercase",
                    }}
                  >
                    Bài viết gần đây
                  </h4>
                  {recentBlogs &&
                    recentBlogs.map((blog) => (
                      <div key={blog.B_id}>
                        <div className="col-sm-12 d-flex flex-column align-items-center my-4">
                          <Link
                            to={`/blogs/blog/${blog.B_id}`}
                            style={{ textDecoration: "none" }}
                            className="d-flex flex-column align-items-center"
                          >
                            <img
                              className="blog-img"
                              src={blog.image}
                              alt="..."
                              style={{ width: "100%" }}
                            />
                            <p
                              className="pb-0 mb-0"
                              style={{
                                fontSize: "16px",
                                color: "#666",
                                fontFamily: "inherit",
                              }}
                            >
                              {blog.B_tieuDe}
                            </p>
                            <div className="d-flex">
                              <BsClock
                                className="mt-1 me-2"
                                style={{ color: "#54a752" }}
                              />
                              <p
                                className="p-0 m-0"
                                style={{ fontSize: "16px", color: "#ccc" }}
                              >
                                {dayjs(blog.B_ngayTao).format("DD-MM-YYYY")}
                              </p>
                            </div>
                            <div className="d-flex">
                              <BsChatFill
                                className="mt-1 me-2"
                                style={{ color: "#54a752" }}
                              />
                              <p
                                className="p-0 m-0"
                                style={{ fontSize: "16px", color: "#ccc" }}
                              >
                                {blog.comment_count}
                              </p>
                            </div>
                          </Link>
                        </div>
                        <hr></hr>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
