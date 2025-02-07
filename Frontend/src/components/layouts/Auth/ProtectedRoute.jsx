import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Unauthorized Access. Please log in first!");
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.role; // Expecting an array like ['ROLE_CUSTOMER']

    if (!Array.isArray(userRoles)) {
      toast.error("Invalid role format. Please log in again.");
      return <Navigate to="/" />;
    }

    // Check if any user role is included in allowedRoles
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      toast.error("Access Denied. You do not have permission to view this page.");
      return <Navigate to="/home" />;
    }

    return <Outlet />;
  } catch (error) {
    toast.error("Invalid Token. Please log in again.");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
