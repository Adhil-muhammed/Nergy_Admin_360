import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://n360-dev.azurewebsites.net/api/",
});
