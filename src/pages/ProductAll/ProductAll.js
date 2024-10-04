import "./ProductAll.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import { BsFunnelFill } from "react-icons/bs";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    getProductAll();
  }, []);

  const getProductAll = async () => {
    try {
      const response = await axios.get("/api/product-all");
      setProducts(response.data.products);
    } catch (e) {
      console.error(e);
    }
  };

  const sortProducts = (value) => {
    let sorted = [...products];
    if (value === "Giá tăng dần") {
      sorted.sort((a, b) => getPriceWithDiscount(a) - getPriceWithDiscount(b));
    } else if (value === "Giá giảm dần") {
      sorted.sort((a, b) => getPriceWithDiscount(b) - getPriceWithDiscount(a));
    }
    setSortedProducts(sorted);
  };

  const getPriceWithDiscount = (product) => {
    if (product.discount) {
      return product.price - product.discount.KM_mucGiamGia;
    }
    return product.price;
  };

  return (
    <div
      className="container-fluid products-background "
      style={{ paddingTop: "4.5rem" }}
    >
      <div className="products-container px-5 pt-4 mt-2">
        <div className="d-flex " style={{ justifyContent: "end" }}>
          <p className="p-0 mb-0 mt-2 me-2" style={{ color: "#787878" }}>
            <BsFunnelFill className="fs-5 mb-1" /> Sắp xếp:
          </p>
          <Select
            defaultValue="Mặc định"
            size="large"
            style={{ width: 140 }}
            onChange={sortProducts}
            options={[
              { value: "Mặc định", label: "Mặc định" },
              { value: "Giá tăng dần", label: "Giá tăng dần" },
              { value: "Giá giảm dần", label: "Giá giảm dần" },
            ]}
          />
        </div>
        <div className="products-body row">
          {(sortedProducts.length > 0 ? sortedProducts : products).map(
            (item) => (
              <div className="col-sm-3 my-4" key={item.id}>
                <Link
                  to={`/product/${item.SP_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card col-sm-12 d-flex"
                    style={{ height: "100%" }}
                  >
                    <img
                      src={item.image}
                      className="card-img-top product-img"
                      alt="..."
                    />
                    <h5 className="card-title product-name">{item.SP_ten}</h5>
                    <p className="card-text product-weight">
                      Trọng lượng: {item.SP_trongLuong} {item.SP_donViTinh}
                    </p>
                    <div>
                      {item.discount && (
                        <del>
                          {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </del>
                      )}
                      <span className="card-text product-price">
                        {getPriceWithDiscount(item).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
