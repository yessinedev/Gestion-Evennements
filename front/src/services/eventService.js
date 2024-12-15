import axios from "axios";

export const fetchEvents = async () => {
    const {data} = await axios.get('http://localhost:8080/evenement1_war/api/events')
    return data;
}