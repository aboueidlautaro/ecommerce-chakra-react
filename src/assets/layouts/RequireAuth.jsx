import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RequireAuth = () => {
  const token = localStorage.getItem("accessToken");

  const { authState } = useContext(AuthContext);

  if (!token && !authState.status) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
