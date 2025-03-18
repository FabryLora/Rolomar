import axios from 'axios';

const axiosTest = axios.create({
    baseURL: "http://localhost:8000", // Usa la URL del backend
});

export default axiosTest;