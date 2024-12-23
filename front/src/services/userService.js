import axios from "axios";

export const fetchUsers = async () => {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`)
    return data;
}