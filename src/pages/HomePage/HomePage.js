import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { ChevronRight } from "react-bootstrap-icons";
import './HomePage.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = (props) => {

    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        console.log('getdata')
        getProductsHome();
    }, [])
    const getProductsHome = async () => {
        try {
            console.log('getdata')
            const response = await axios.get('/api/products-home')
            console.log('getdata')

            setCategorys(response.data)
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="container-fluid homepage-background mt-4">
            {/* <Nav /> */}
            <div className="container homepage-container" >
                <Banner />
                <div>
                    {categorys && categorys.map(category => (
                        <div key={category.DMSP_id} className="container section-container p-5 my-4">
                            <div className="section-header d-flex mb-4">
                                <span className="section-title">{category.DMSP_ten}</span>
                                <Link to={`/products/${category.DMSP_id}`} className="section-btn">Tất cả sản phẩm <ChevronRight /></Link>
                            </div>
                            <div className="section-body row" >
                                {
                                    category.products.map(product => (
                                        <div className="col-sm-3 section-item" key={product.SP_id}  >
                                            <Link to={`/product/${product.SP_id}`} style={{ textDecoration: 'none', }}>
                                                <div className="card col-sm-12 d-flex" style={{ height: '100%' }}>
                                                    <img src={product.image} className="card-img-top product-img" alt="..." />
                                                    <h5 className="card-title product-name" >{product.SP_ten}</h5>
                                                    <p className=" product-weight " style={{ color: '#333' }}>Trọng lượng: {product.SP_trongLuong} {product.SP_donViTinh}</p>
                                                    <div>
                                                        {
                                                            product.discount && <del>
                                                                {product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                            </del>
                                                        }
                                                        <span className="card-text product-price">{product.discount ? (product.price - product.discount.KM_mucGiamGia).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                            <div />

                        </div>
                    ))
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );

}
export default HomePage;