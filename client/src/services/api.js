import axios from 'axios';

const api = axios.create({
    baseURL: `http://${window.location.hostname}:5001/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('cyber_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
