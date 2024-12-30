import axios from "axios";
// Axios instance to easily switch out back end route
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;