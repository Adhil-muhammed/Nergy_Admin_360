import { Axios } from "utils";

export const getStats = async () => {
  const res = await Axios.get("/Stats");
  return res.data;
};

