import { Axios } from "utils";

export const getUsers = async () => {
  const res = await Axios.get("/Users");
  return res.data;
};

export const createUsers = async (user) => {
  const res = await Axios.post("/Users", user);
  return res.data;
};

export const updateUsers = async (user) => {
  const res = await Axios.put("/Users", user);
  return res.data;
};

export const deteleUsers = async (userId) => {
  const res = await Axios.delete(`/Users/${userId}`);
  return res.data;
};

export const getUserById = async (userId) => {
  const res = await Axios.get(`/Users/${userId}`);
  return res.data;
};
