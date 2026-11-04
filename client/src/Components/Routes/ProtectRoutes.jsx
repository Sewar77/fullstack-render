import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const { currentUser, authMe } = useAuth();
  useEffect(() => {
    authMe();
  }, []);

  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
