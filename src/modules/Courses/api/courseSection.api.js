import { Axios } from "utils";

export const createCourseSection = async (section) => {
  const res = await Axios.post("/Courses/section", section);
  return res.data;
};

export const updateCourseSectionById = async (section) => {
  const res = await Axios.put(`/Courses/section/${section.sectionId}`, section);
  return res.data;
};

export const deleteCourseSectionById = async (sectionId) => {
  const res = await Axios.delete(`/Courses/section/${sectionId}`);
  return res.data;
};

export const getSectionById = async (Id) => {
  const res = await Axios.get(`/Courses/section/${Id}`);
  return res.data;
};
