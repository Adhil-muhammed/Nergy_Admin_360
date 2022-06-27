import { Axios } from "utils";

export const getQuestions = async () => {
  const res = await Axios.get("/Questions");
  return res.data;
};

export const createNewQuestion = async (question) => {
  const res = await Axios.post("/Questions", question);
  return res.data;
};

export const updateQuestion = async () => {
  const res = await Axios.put("/Questions");
  return res.data;
};

export const getQuestionById = async (id) => {
  const res = await Axios.get(`/Questions/${id}`);
  return res.data;
};

export const deleteQuestion = async (id) => {
  const res = await Axios.delete(`/Questions/${id}`);
  return res.data;
};
