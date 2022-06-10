import { Axios } from "utils";

export const getCourses = async () => {
  const res = await Axios.get("/Courses");
  console.log(res);
  return res.data;
};

export const createCourses = async (course) => {
  const res = await Axios.post("/Courses", course);
  console.log(res);
  return res.data;
};

export const updateCourses = async (course) => {
  const res = await Axios.put("/Courses", course);
  return res.data;
};

export const deteleCourses = async (courseId) => {
  const res = await Axios.delete(`/Courses/${courseId}`);
  return res.data;
};