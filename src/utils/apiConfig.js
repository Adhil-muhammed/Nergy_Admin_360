import axios from "axios";
import { getToken } from ".";

export const Axios = axios.create({
  //baseURL: "http://n360-dev.azurewebsites.net/api/",
  baseURL: "https://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      config.headers["Authorization"] = null;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
