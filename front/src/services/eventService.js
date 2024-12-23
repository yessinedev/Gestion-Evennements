import axios from "axios";

export const fetchEvents = async () => {
    const {data} = await axios.get('http://localhost:8080/evenement1/api/events')
    return data;
}

export const participateToEvent = async (participant) => {
    const {data} = await axios.post('http://localhost:8080/evenement1/api/participants/join', participant)
    return data;
}
export const createEvent = async (event) => {
    const headers ={"Content-Type":"application/json"};
    const { data } = await axios.post(`http://localhost:8080/evenement1/api/events`,event,{headers})
    return data;
}
export const updateEvent = async (eventId, event) => {
    const { data } = await axios.put(`http://localhost:8080/evenement1/api/events/${eventId}`,event)
    return data;
}
export const deleteEvent = async (eventId) => {
    const { data } = await axios.delete(`http://localhost:8080/evenement1/api/events/${eventId}`)
    return data;
}
  


