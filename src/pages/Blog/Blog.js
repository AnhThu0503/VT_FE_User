import './Blog.scss';
import { useState, useEffect } from 'react';
import { Tree } from 'antd';
import axios from 'axios'
const { DirectoryTree } = Tree;


const Blog = (props) => {
    const [categorys, setCategorys] = useState([])
    const [treeData, setTreeData] = useState([])
    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/categorys')
            setCategorys(response.data)
            var data = [
                {
                    title: 'Danh mục sản phẩm',
                    key: '0-0',
                    children: [],
                }
            ]
            response.data.forEach((item, idx) => {
                data[0].children.push({
                    title: item.DMSP_ten,
                    key: '0-0-' + idx,
                    isLeaf: true,
                })
            })
            setTreeData(data)
        } catch (e) {
            console.error(e)
        }
    }
    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };
    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: 'Bánh Pía Sóc Trăng ngon trứ danh',
            content: 'Bánh pía là đặc sản Sóc Trăng nổi tiếng khắp nơi và thường được nhiều du khách mua làm quà sau mỗi chuyến ghé thăm nơi đây...',
            productType: 1,
            image: 'https://cdn3.ivivu.com/2023/04/banh-pia-soc-trang-ivivu.jpeg'
        },
        {
            id: 2,
            title: 'Bánh in Cổ Cò ngọt ngào hương vị miền Tây',
            content: 'Bánh in thu hút tín đồ hảo ngọt bởi vẻ ngoài là hình tròn màu trắng. Bánh in được dùng nhiều nhất vào các dịp lễ hội đặc biệt...',
            productType: 2,
            image: 'https://cdn3.ivivu.com/2023/04/B%C3%A1nh-in-ivivu1.jpg'
        },
        {
            id: 3,
            title: 'Độc đáo thức quà vặt mè láo Sóc Trăng',
            content: 'Mè láo là đặc sản nổi tiếng của người Hoa ở Sóc Trăng. Nó được làm từ khoai môn bào mỏng rồi đem phơi nắng khoảng 3 ngày...',
            productType: 3,
            image: 'https://cdn3.ivivu.com/2023/04/m%C3%A8-l%C3%A1o-ivivu.jpg'

        },
        {
            id: 4,
            title: 'Vú sữa tím Đại Tâm là giống sữa tím nổi tiếng',
            content: 'Loại trái cây được yêu thích và trở thành trái cây đặc sản bởi có vỏ mỏng, vị ngọt thanh và hạt siêu nhỏ...',
            productType: 4,
            image: 'https://ik.imagekit.io/tvlk/blog/2022/05/dac-san-soc-trang-1-1024x768.jpg?tr=dpr-2,w-675'

        },
        {
            id: 5,
            title: 'Bưởi Năm Roi Kế Thành nức tiếng khắp vùng đồng bằng sông Cửu Long',
            content: 'Loại bưởi có vỏ mỏng, vị đậm, không có vị the đắng và không có hoặc rất ít hạt...',
            productType: 4,
            image: 'https://ik.imagekit.io/tvlk/blog/2022/05/dac-san-soc-trang-2.jpg?tr=dpr-2,w-675'

        },
        {
            id: 6,
            title: 'Lạp xưởng Vũng Thơm',
            content: 'Lạp xưởng Vũng Thơm được sản xuất theo bí quyết truyền thống với đủ loại từ lạp xưởng heo; lạp xưởng tôm đến lạp xưởng gà...',
            productType: 5,
            image: 'https://ik.imagekit.io/tvlk/blog/2022/05/dac-san-soc-trang-9.jpeg?tr=dpr-2,w-675'

        },
        {
            id: 7,
            title: 'Khô trâu Thạnh Trị',
            content: 'Thịt trâu được tuyển chọn là loại thịt bắp được miếng mỏng rồi ướp gia vị theo bí quyết riêng. Sau đó, thịt ngấm gia vị mới được mang phơi nắng hoặc sấy trong lò...',
            productType: 6,
            image: 'https://ik.imagekit.io/tvlk/blog/2022/05/dac-san-soc-trang-10.jpg?tr=dpr-2,w-675'

        },
        {
            id: 6,
            title: 'Xá bấu Vĩnh Châu',
            content: 'Xá bấu hay gọi là củ cải muối ở huyện Vĩnh Châu - Sóc Trăng vốn là món ăn truyền thống của người Hoa. Theo thời gian dài cộng cư, nét văn hóa ẩm thực này chiếm dần tình cảm của cả người Khmer và người Kinh...',
            productType: 7,
            image: 'https://thamhiemmekong.com/wp-content/uploads/2020/07/amthucsoctrang-1.jpg'

        },
        {
            id: 7,
            title: 'Mắm bò hóc',
            content: 'Trong danh sách những món ngon đặc sản Sóc Trăng, món nước chấm đặc biệt như mắm tôm, mắm ruốc, hay mắm bò hóc cũng góp phần làm nên sự đa dạng và hấp dẫn của ẩm thực vùng đất này...',
            productType: 8,
            image: 'https://lamsonfood.com/wp-content/uploads/2023/06/Mam-ca.jpg'

        },
    ])
    return (
        <div className="container blog-container my-4 p-4">
            <div className="row">
                <div className='box-blog col-12 col-sm-9'>
                    <div className='row'>
                        {
                            blogs && blogs.map((item) => (
                                <>
                                    <div className="card mb-3 ">
                                        <div className="row g-0 blog-item p-2">
                                            <div className="col-md-4 blog-img">
                                                <img src={item.image} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title blog-title">{item.title}</h5>
                                                    <p className="card-text blog-content">{item.content}</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <hr></hr>
                                </>

                            ))
                        }
                    </div>
                </div>
                <div className='recent-blog col-sm-3 d-none d-sm-block'>
                    <div className='list-product'>
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

        </div >
    );
}
export default Blog;