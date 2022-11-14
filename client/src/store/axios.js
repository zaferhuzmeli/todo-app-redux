import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:7000',
    baseURL: `http://${process.env.REACT_APP_BASE_URL}`,
});

export default axiosInstance;