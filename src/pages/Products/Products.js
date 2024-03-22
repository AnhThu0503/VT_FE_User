import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from 'react-router-dom';

import './Products.scss';
import axios from "axios";
const Products = (props) => {
    const location = useLocation()
    const { id } = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({})

    useEffect(() => {
        getAllProductOfCategory();
    }, [location])

    const getAllProductOfCategory = async () => {
        try {
            setProducts([])
            const response = await axios.get('/api/products/category', {
                params: {
                    DMSP_id: id,
                }
            })
            setProducts(response.data.products)
            setCategory(response.data.category)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="container-fluid products-background my-4">
            {/* <Nav /> */}
            <div className="container products-container px-5 pt-4">
                <p className="title-primary">{category.DMSP_ten}</p>
                <div className="products-body row">
                    {
                        products.length > 0 ? products.map((item) => (
                            <div className="col-sm-3 my-4" key={item.id}>
                                <Link to={`/product/${item.SP_id}`} style={{ textDecoration: 'none', }}>
                                    <div className="card col-sm-12 d-flex" style={{ height: '100%' }}>
                                        <img src={item.image} className="card-img-top product-img" alt="..." />
                                        <h5 className="card-title product-name">{item.SP_ten}</h5>
                                        <p className="card-text product-weight">Trọng lượng: {item.SP_trongLuong} {item.SP_donViTinh}</p>
                                        <div>
                                            {
                                                item.discount && <del>
                                                    {item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                </del>
                                            }
                                            <span className="card-text product-price">{item.discount ? (item.price - item.discount.KM_mucGiamGia).toLocaleString('vi', { style: 'currency', currency: 'VND' }):item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        )) :
                            <div className="box-loader">
                                <span className="loader"></span>
                            </div>

                    }
                </div>


            </div>
            {/* <Footer /> */}
        </div>
    );
}
export default Products;