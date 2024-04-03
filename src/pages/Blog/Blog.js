import "./Blog.scss";
import { useState, useEffect } from "react";
import { Tree } from "antd";
import axios from "axios";

const Blog = () => {
  const [treeData, setTreeData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getAllCategory();
    getAllBlog();
  }, []);
  const getAllBlog = async () => {
    try {
      const response = await axios.get("/api/blogs");
      console.log("blogs>>>>>>>>>>>>>>>>>", response.data);
      if (response.data) setBlogs(response.data);
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

  return (
    <div
      className="container blog-container my-4 p-4"
      style={{ paddingTop: "4.5rem" }}
    >
      <div className="row">
        <div className="box-blog col-12 col-sm-9">
          <div className="row">
            {blogs &&
              blogs.map((item, index) => (
                <div key={item.B_id}>
                  <div className="card mb-3 ">
                    <div className="row g-0 blog-item p-2">
                      <div className="col-md-4 blog-img"></div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title blog-title">
                            {item.B_tieuDe}
                          </h5>
                          <p className="card-text blog-content">
                            {item.B_noiDung}
                          </p>

                          <p className="card-text blog-content">
                            {item.B_ngayTao}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </div>
              ))}
          </div>
        </div>
        <div className="recent-blog col-sm-3 d-none d-sm-block">
          <div className="list-product">
            <Tree
              multiple
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
