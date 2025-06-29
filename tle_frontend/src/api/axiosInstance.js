import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_LOCAL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        'Authorization':null
    }
})