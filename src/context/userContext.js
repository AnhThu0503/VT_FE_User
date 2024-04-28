import axios from "axios";
import { useState, createContext } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(0);

  const authLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/login", { params: { token } });
      console.log(response.data);
      setUser(response.data.user[0]);
      setCart(response.data.numberProductToCart.sum);
    } else {
      setUser({ auth: false });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("logout");
    setUser({ auth: false });
  };

  const getCart = async () => {
    try {
      const response = await axios.get("/api/cart/sum", {
        params: {
          ND_id: user.ND_id,
        },
      });
      console.log("response", response);
      if (response.data) {
        setCart(response.data);
      } else {
        setCart(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, authLogin, cart, getCart, setCart, setUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
