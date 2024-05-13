import { useState } from "react";
import FormAddressVN from "../../../components/AddressVN/FormAddress";
import { Input, Button, notification } from "antd";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
const key = "updatable";
const { TextArea } = Input;

const FormAddress = () => {
  const [customer, setCustomer] = useOutletContext();
  const [address, setAddress] = useState();
  const [address_detail, setAddressDetail] = useState();
  const [api, contextHolder] = notification.useNotification();

  const updateAddress = async () => {
    try {
      if (address && address_detail) {
        const response = await axios.put("/api/address", {
          address: address_detail + " - " + address,
          ND_id: customer.ND_id,
        });
        if (response.data) {
          api.open({
            key,
            type: "success",
            message: "Cập nhật địa chỉ thành công",
          });
          setCustomer({
            ...customer,
            ND_diaChi: address_detail + " - " + address,
          });
          window.location.href = "/account/address";
        } else {
          api.open({
            key,
            type: "error",
            message: "Cập nhật địa chỉ thất bại",
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <FormAddressVN address={address} setAddress={setAddress} />
      <TextArea
        value={address_detail}
        onChange={(e) => setAddressDetail(e.target.value)}
        placeholder="Địa chỉ"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div className="text-end">
        <Button
          type="primary"
          className="mt-3"
          onClick={updateAddress}
          style={{ backgroundColor: "#ff4d00" }}
        >
          Cập nhật
        </Button>
      </div>
      {contextHolder}
    </div>
  );
};

export default FormAddress;
