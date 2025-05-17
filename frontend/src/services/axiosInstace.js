import axios from 'axios'

const host = "https://stay-here-backend.onrender.com"
export const axiosInstance = axios.create({
    baseURL: `${host}/api/v1`
})
