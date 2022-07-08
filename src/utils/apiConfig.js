import axios from "axios";
import { getToken } from ".";

export const Axios = axios.create({
  baseURL: "http://n360-dev.azurewebsites.net/api/",
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
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("localData");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);
