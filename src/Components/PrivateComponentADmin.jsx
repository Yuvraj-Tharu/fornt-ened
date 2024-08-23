import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateComponentADmin() {
  const admin = sessionStorage.getItem("admin");
  return admin ? <Outlet /> : <Navigate to="/sign-up" />;
}
