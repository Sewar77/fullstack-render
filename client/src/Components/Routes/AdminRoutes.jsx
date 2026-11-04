import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

export default function AdminRoutes({ children }) {
  const { currentUser, authMe, loading } = useAuth();
  useEffect(() => {
    authMe();
  }, []);
  if (loading) {
    return <LinearProgress />;
  }
  console.log("currentUser", currentUser);

  if (!currentUser || currentUser?.role !== "admin") {
    return <Navigate to={"/unautherized"} replace />;
  }
  return children;
}
