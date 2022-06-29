import { Axios } from "utils";

export const authenticate = async (auth) => {
  const res = await Axios.post("/Accounts/SignIn", auth);
  return res.data;
};

export const getForgotPassword = async (email) => {
  const res = await Axios.get(`/Users/ForgotPassword/${email}`);
  return res.data;
};

export const resetPassword = async (auth) => {
  const res = await Axios.post('/Users/ResetPassword', auth);
  return res.data;
};
