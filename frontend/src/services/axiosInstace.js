import axios from 'axios'

const host = "http://localhost:5000"
export const axiosInstance = axios.create({
    baseURL: `${host}/api/v1`
})
