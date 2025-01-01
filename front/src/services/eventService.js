import axios from "axios";

export const fetchEvents = async () => {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events`)
    return data;
}

export const participateToEvent = async (participant) => {
    const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/participants/join`, participant)
    return data;
}
export const createEvent = async (event) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events`,event)
    return data;
}
export const updateEvent = async (eventId, event) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`, event)
    return data;
}
export const deleteEvent = async (eventId) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`)
    return data;
}
  


