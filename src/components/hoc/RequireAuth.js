import { useLocation, Navigate } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const login = useSelector((state) => state.user.login);
  if (!login) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
