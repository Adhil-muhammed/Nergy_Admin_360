import { Axios } from "utils";

export const authenticate = async (auth) => {
  const res = await Axios.post("/Accounts/SignIn", auth, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
};
