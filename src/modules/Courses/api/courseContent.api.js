import { Axios } from "utils";

export const createCoursesContent = async (content) => {
  const res = await Axios.post("/Courses/content", content, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteCoursesContentById = async (id) => {
  const res = await Axios.delete(`/Courses/content/${id}`);
  return res.data;
};

export const updateCoursesContentById = async (id) => {
  const res = await Axios.put(`/Courses/content/${id}`);
  return res.data;
};

export const getCourseContentById = async (id) => {
  const res = await Axios.get(`/Courses/content/${id}`);
  return res.data;
};
