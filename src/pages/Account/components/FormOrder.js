import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { Table, Button, Select, Modal } from "antd";
import { notification } from "antd";
const key = "updatable";

const FormOeder = () => {
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (user?.ND_id) {
      getOrdersOfCustomer();
    }
  }, [user.ND_id]);
  function formatDate(dateObject) {
    const date = new Date(dateObject);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits, pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const getOrdersOfCustomer = async () => {
    try {
      const response = await axios.get("/api/order-customer", {
        params: {
          ND_id: user.ND_id,
        },
      });

      let arrtmp = [];
      response.data.forEach((data) => {
        arrtmp.push({
          DH_id: data.order.DH_id,
          index: data.order.DH_id,
          DH_trangThai: data.order.DH_trangThai,
          DH_tongTien: data.order.DH_tongTien.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
          DH_ngayDat: formatDate(data.order.DH_ngayDat),
          DonHangCT: data.detailOrderProduct,
        });
      });
      console.log(arrtmp);
      setOrders(arrtmp);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = async (value, record) => {
    try {
      const response = await axios.put("/api/order/update", {
        DH_id: record.DH_id,
        trangthai: value,
      });

      if (response.data) {
        console.log(response);
        api.open({
          key, // Unique key for each notification
          message: "Cập nhật trạng thái thành công",
        });
      } else {
        api.open({
          key, // Unique key for each notification
          message: "Cập nhật trạng thái thất bại",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Ngày đặt",
      dataIndex: "DH_ngayDat",
    },
    {
      title: "Thông tin giao hàng",
      dataIndex: "chiTietKH",
      render: (_, record) => {
        return (
          <div className="ms-4">
            <Button
              onClick={() => {
                showModal(record);
              }}
            >
              Chi tiết
            </Button>
          </div>
        );
      },
    },
    {
      title: "Tổng Tiền",
      dataIndex: "DH_tongTien",
    },
    {
      title: "Trạng thái",
      dataIndex: "DH_trangThai",
      render: (text, record) => (
        <Select
          defaultValue={record.DH_trangThai}
          style={{ width: 150 }}
          onChange={(e) => handleChange(e, record)}
        >
          <Select.Option value="Đã nhận hàng">Đã nhận hàng</Select.Option>
          <Select.Option value="Hủy đơn hàng">Hủy đơn hàng</Select.Option>
        </Select>
      ),
    },
    {
      title: "Chi tiết đơn hàng",
      dataIndex: "DonHangCT",
      render: (text, record) => (
        <div className="ms-2">
          <Button
            onClick={() => {
              console.log(record);
              setIsModalOrderOpen(true);
              setOrder(record);
            }}
          >
            Xem thêm
          </Button>
        </div>
      ),
    },
  ];
  const showModal = (record) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOrderOpen(false);
  };

  const handleCancel = () => {
    setIsModalOrderOpen(false);
    setIsModalOpen(false);
  };
  return (
    <div className="container-order">
      {contextHolder}
      <Table
        columns={columns}
        dataSource={orders}
        style={{ verticalAlign: "center" }}
      />
      <Modal
        title="Thông tin giao hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {user && (
          <>
            <div>Tên khách hàng: {user.ND_ten}</div>
            <div>SĐT: {user.ND_SDT}</div>
            <div>Địa chỉ: {user.ND_diaChi}</div>
          </>
        )}
      </Modal>
      <Modal
        title="Chi tiết đơn hàng"
        open={isModalOrderOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {order.DonHangCT && order.DonHangCT.length > 0 ? (
            order.DonHangCT.map((item, index) => (
              <div key={index} className="mb-3 d-flex row">
                <div className="col-sm-4">
                  <img
                    key={1}
                    src={item?.hinhanh ? item.hinhanh : ""}
                    alt="Hình ảnh sản phẩm"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-6">
                  <div>Tên sản phẩm: {item.SP_ten}</div>
                  <div>
                    Trọng lượng: {item.SP_trongLuong}
                    {item.SP_donViTinh}
                  </div>
                  <div>Số lượng: {item.soluong}</div>
                </div>
              </div>
            ))
          ) : (
            <div>No order details available</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FormOeder;
