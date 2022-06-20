import { Axios } from "utils";

export const authenticate = async (auth) => {
  const res = await Axios.post("/Accounts/SignIn", auth);
  return res.data;
};
