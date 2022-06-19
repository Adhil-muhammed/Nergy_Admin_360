import { Axios } from "utils";

export const getStudents = async (pagination) => {
  const { pageIndex, pageSize } = pagination;
  const res = await Axios.get(`/Students?top=${1}&pageNo=${pageIndex}&pageSize=${pageSize}`);
  return res.data;
};

export const createStudents = async (student) => {
  const res = await Axios.post("/Students", student);
  return res.data;
};

export const updateStudents = async (batch) => {
  const res = await Axios.put("/Students", batch);
  return res.data;
};

export const deteleStudents = async (studentId) => {
  const res = await Axios.delete(`/Students/${studentId}`);
  return res.data;
};
