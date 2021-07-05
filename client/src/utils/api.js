import axios from "axios"

export const authClient = axios.create()
authClient.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})