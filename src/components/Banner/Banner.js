import banner1 from "../../assets/Banner/Banner1.jpg";
import banner2 from "../../assets/Banner/Banner2.jpg";
import banner3 from "../../assets/Banner/Banner3.jpg";
import banner4 from "../../assets/Banner/Banner4.jpg";
import banner5 from "../../assets/Banner/Banner5.jpg";
import banner7 from "../../assets/Banner/Banner7.jpg";
import "./Banner.scss";
const Banner = () => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
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

        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="Banner 3" />
        </div>
        <div className="carousel-item">
          <img src={banner4} className="d-block w-100" alt="Banner 4" />
        </div>
        <div className="carousel-item">
          <img src={banner5} className="d-block w-100" alt="Banner 5" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default Banner;
