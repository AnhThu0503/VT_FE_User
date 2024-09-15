import banner1 from "../../assets/Banner/organic2-slider2.jpg";

import banner7 from "../../assets/Banner/organic2-slider1.jpg";
import banner2 from "../../assets/Banner/organic22-banner-1.jpg";

import "./Banner.scss";
const Banner = () => {
  return (
    <div className="d-flex">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade col-sm-8 p-4"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner7} className="d-block w-100" alt="Banner 6" />
          </div>
          <div className="carousel-item ">
            <img src={banner1} className="d-block w-100" alt="Banner 1" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="col-sm-4">
        <img
          src={banner2}
          alt="Banner 2"
          className="pt-4 "
          style={{ backgroundSize: "cover" }}
        />
      </div>
    </div>
  );
};
export default Banner;
