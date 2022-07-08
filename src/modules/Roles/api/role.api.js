import { Axios } from "utils";

export const getRoles = async () => {
  const res = await Axios.get("/UserRoles");
  return res.data;
};

export const createRoles = async (role) => {
  const res = await Axios.post("/UserRoles", role);
  return res.data;
};

export const updateRoles = async (role) => {
  const res = await Axios.put("/UserRoles", role);
  return res.data;
};

export const deteleRoles = async (roleId) => {
  const res = await Axios.delete(`/UserRoles/${roleId}`);
  return res.data;
};

export const getRoleById = async (roleId) => {
  const res = await Axios.get(`/UserRoles/${roleId}`);
  return res.data;
};
