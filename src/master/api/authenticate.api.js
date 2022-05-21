import { Axios } from "src/utils/apiConfig";

export const authenticate = async (auth) => {
  const res = await Axios.post("/Accounts/SignIn", auth);
  return res.data;
};
