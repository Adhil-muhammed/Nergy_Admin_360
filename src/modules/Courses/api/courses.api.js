import { Axios } from "utils";

export const getCourses = async () => {
  const res = await Axios.get("/Courses");
  return res.data;
};

export const getCourseById = async (courseId) => {
  const res = await Axios.get(`/Courses/${courseId}`);
  return res.data;
};

export const createCourses = async (course) => {
  const res = await Axios.post("/Courses", course, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateCourses = async (course) => {
  const res = await Axios.put("/Courses", course, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deteleCourses = async (courseId) => {
  const res = await Axios.delete(`/Courses/${courseId}`);
  return res.data;
};



