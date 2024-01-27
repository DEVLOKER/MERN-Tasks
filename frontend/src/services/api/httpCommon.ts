import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 5 * 1000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error?.response?.data) return Promise.reject(error.response.data);
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
