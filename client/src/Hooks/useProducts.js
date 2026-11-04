import { useEffect, useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const getAllProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data.products);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message);
            return;
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);
    const addProduct = async (data) => {
        try {
            console.log(data);
            const res = await api.post("/product", data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }

            );
            getAllProducts();
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
            return;
        }
    };
    const fetchAllProductsByCatId = async (id) => {
        try {
            const res = await api.get(`/category/${id}/products`);
            setProductsCategory(res.data.products);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);
            return;
        }
    };
    const fetchAllProductsById = async (id) => {
        try {
            const res = await api.get(`/product/${id}`);
            setProduct(res.data.product);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);
            return;
        }
    };

    return {
        products,
        addProduct,
        loading,
        fetchAllProductsByCatId,
        productsCategory,
        fetchAllProductsById,
        product,
    };
};
