import axios from "axios";

// Cambiamos la forma en que definimos la URL base
// Ya no usamos el subdominio sino una ruta relativa
const axiosClient = axios.create({
    // Aquí usamos la URL del dominio principal y añadimos /api
    // Si VITE_API_BASE_URL está definido, lo usamos como base (para desarrollo/producción)
    // De lo contrario, usamos una ruta relativa '/api'
    baseURL: import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/api` 
        : '/api',
});

axiosClient.interceptors.request.use((config) => {
    const isAdminRoute = config.url.includes('admin');

    
    
    const token = isAdminRoute
        ? localStorage.getItem("ADMIN_TOKEN")
        : localStorage.getItem("TOKEN");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            /* localStorage.removeItem("TOKEN"); */
            /* window.location.reload(); */
            /* router.navigate("/login"); */
            return error;
        }
        throw error;
    }
);

export default axiosClient;