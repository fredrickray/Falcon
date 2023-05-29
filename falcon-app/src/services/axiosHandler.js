import axios from "axios";

 export const axiosInstance = axios.create()
const token = localStorage.token
axiosInstance.interceptors.request.use( async(config) => {
    config.headers.Authorization = `Bearer ${token}`
    // config.headers.Accept = "Applic"
    return config})
