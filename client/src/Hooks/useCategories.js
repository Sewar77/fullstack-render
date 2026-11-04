import { useEffect, useState } from "react"
import { api } from "../api"
import toast from "react-hot-toast";

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const getAllCategories = async () => {
        try {
            const res = await api.get("/categories")
            setCategories(res.data.categories)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message);
            return;
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])


    return { categories, loading }
}