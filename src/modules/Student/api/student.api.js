import { Axios } from "utils";

export const getStudents = async (pagination) => {
  const { pageIndex, pageSize } = pagination;
  const res = await Axios.get(`/Students?pageNo=${pageIndex}&pageSize=${pageSize}`);
  return res.data;
};

export const createStudents = async (student) => {
  const res = await Axios.post("/Students", student);
  return res.data;
};

export const updateStudents = async (student) => {
  const res = await Axios.put("/Students", student);
  return res.data;
};

export const getStudentById = async (studentId) => {
  const res = await Axios.get(`/Students/${studentId}`);
  return res.data;
};

export const deteleStudents = async (studentId) => {
  const res = await Axios.delete(`/Students/${studentId}`);
  return res.data;
};

export const importStudents = async (content) => {
  const res = await Axios.post("/Students/ImportStudents", content, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
