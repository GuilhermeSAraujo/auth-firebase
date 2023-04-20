import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:3030",
    baseURL: "https://ecommerce-api-zrsc.onrender.com",
  });

  export default axiosInstance;