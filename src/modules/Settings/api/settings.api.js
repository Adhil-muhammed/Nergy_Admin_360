import { Axios } from "utils";

export const getSettings = async () => {
  const res = await Axios.get("/Settings");
  return res.data;
};

// export const createUsers = async (user) => {
//   const res = await Axios.post("/Users", user);
//   return res.data;
// };

// export const updateUsers = async (user) => {
//   const res = await Axios.put("/Users", user);
//   return res.data;
// };

// export const deteleUsers = async (userId) => {
//   const res = await Axios.delete(`/Users/${userId}`);
//   return res.data;
// };