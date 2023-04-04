import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoutes({ children }) {
  let user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return children;
}
