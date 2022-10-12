import { Axios } from "utils";

export const createCourseSection = async (section) => {
  const res = await Axios.post("/Courses/section", section);
  return res.data;
};

export const updateCourseSectionById = async (sectionId) => {
  const res = await Axios.put("/section/${sectionId}");
  return res.data;
};

export const deleteCourseSection = async (sectionId) => {
  const res = await Axios.delete("/section/${sectionId}");
  return res.data;
};

export const selectCourseSectionById = async () => {
  const res = await Axios.get("/section/${Id}");
  return res.data;
};
