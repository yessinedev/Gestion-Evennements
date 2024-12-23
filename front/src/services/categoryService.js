import axios from 'axios';

export const fetchCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
    return data;
};
