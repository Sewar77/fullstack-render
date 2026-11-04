import { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCart = async () => {
        try {
            const res = await api.get("/cart");
            setCart(res.data.cart);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            return;
        }
    };

    const creatCart = async (productId) => {
        try {
            const res = await api.post("/cart/items", { productId });
            toast.success(res.data.message);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            return;
        }
    };
    const increase = async (id) => {
        try {
            const res = await api.put(`/products/${id}/increase`);
            toast.success(res.data.message);
            setLoading(false);
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message);
            return;
        }
    };
    const decrease = async (id) => {
        try {
            const res = await api.put(`/products/${id}/increase`);
            toast.success(res.data.message);
            setLoading(false);
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message);
            return;
        }
    };

    const checkOut = async (cartItems) => {
        try {
            const res = await api.post('/order/checkout', { items: cartItems })
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message);
            return;
        }
    }

    return { cart, loading, getCart, creatCart, increase, decrease, checkOut };
};
