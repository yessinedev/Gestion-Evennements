import axios from 'axios';

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:8080/evenement1/api/categories')
    return data;
};
