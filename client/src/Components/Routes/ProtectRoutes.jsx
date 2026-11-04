import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
