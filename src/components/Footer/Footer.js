import "./Footer.scss";
const Footer = () => {
  return (
    <div
      className="container-fluid footer-container"
      style={{
        backgroundColor: "currenColor",
      }}
    >
      <div className="horizontal-line my-4"></div>
      <div className="container" style={{ color: "#000000" }}>
        <div className="row py-4">
          <div className="col-sm-4 ">
            <h5>FRESH VEGETABLE</h5>
            <p>
              Chuyên cung cấp nông sản sạch uy tín nhất giao hàng tận nơi nhanh
              nhất.
            </p>
          </div>
          <div className="col-sm-3">
            <h5>HỖ TRỢ KHÁCH HÀNG</h5>
            <p>
              Chính sách bảo mật <br />
              Điều khoản sử dụng <br />
              Giao hàng và đổi trả <br />
              Phương thức thanh toán <br />
              Chính sách chiết khấu <br />
            </p>
          </div>
          <div className="col-sm-2">
            <h5>LIÊN KẾT</h5>
            <p>
              Rau củ <br /> Trái cây <br />
            </p>
          </div>

          <div className="col-sm-3">
            <h5>LIÊN HỆ</h5>
            <p>
              Hotline: 0358184035 <br />
              <hr />
              Email:phamhongphuong@gmail.com <br />
              <hr />
              Giờ hoạt động 8:00 đến 22:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
