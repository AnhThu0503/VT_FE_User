import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);

  return user && user.auth ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
