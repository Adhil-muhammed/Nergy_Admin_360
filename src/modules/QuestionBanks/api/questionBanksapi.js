import { Axios } from "utils";

export const getQuestionBanks = async () => {
  const res = await Axios.get("/QuestionBanks");
  return res.data;
};

export const getQuestionBanksById = async (questionBankId) => {
  const res = await Axios.get(`/QuestionBanks/${questionBankId}`);
  return res.data;
};

export const createQuestionBanks = async (questionBank) => {
  const res = await Axios.post("/QuestionBanks", questionBank);
  return res.data;
};

export const updateQuestionBanks = async (questionBank) => {
  const res = await Axios.put("/QuestionBanks", questionBank);
  return res.data;
};

export const deteleQuestionBanks = async (questionBankId) => {
  const res = await Axios.delete(`/QuestionBanks/${questionBankId}`);
  return res.data;
};
