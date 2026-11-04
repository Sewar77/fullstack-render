import { useState } from "react"
import { api } from "../api"
import toast from "react-hot-toast";

export const useUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const getAllUsers = async () => {
        try {
            const res = await api.get("/users")
            setUsers(res.data.users)
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false)
            return;
        }
    }



    return { getAllUsers, users, loading }
}
