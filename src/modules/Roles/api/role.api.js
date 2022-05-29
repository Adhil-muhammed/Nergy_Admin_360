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

export const deteleRoles = async (role) => {
  const res = await Axios.delete(`/UserRoles/${role.roleId}`);
  return res.data;
};
