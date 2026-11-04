import toast from "react-hot-toast";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true)
    const login = async (userData) => {
        try {
            if (!userData.email || !userData.password) {
                toast.error("Please fill email and password");
                return;
            }
            const res = await api.post("/auth/login", userData);
            setCurrentUser(res.data.user)
            toast.success(res.data.message);
            if (res.data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message);
            return;
        }
    };
    const register = async (userData) => {
        try {
            if (
                !userData.email ||
                !userData.fname ||
                !userData.lname ||
                !userData.confirmPassword ||
                !userData.password ||
                !userData.role
            ) {
                toast.error("Please fill email and password");
                return;
            }
            const res = await api.post("/auth/register", userData);

            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message);
            return;
        }
    };
    const authMe = async () => {
        try {
            const res = await api.get("/auth/me");
            console.log(res);

            setCurrentUser(res.data.user);
            console.log(res.data.user.role);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return;
        }
    };
    const logout = async () => {
        try {
            const res = await api.get("/auth/logout");
            toast.success(res.data.message)
        } catch (error) {
            console.error(error);
            setLoading(false)
            toast.error(error.response?.data?.message);
            return;
        }
    };
    return { login, currentUser, authMe, register, loading, logout };
};
