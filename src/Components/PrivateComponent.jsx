import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateComponent() {
  const user = sessionStorage.getItem("users");

  return user ? <Outlet /> : <Navigate to="/sign-up" />;
}
