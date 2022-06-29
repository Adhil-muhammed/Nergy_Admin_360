import React from "react";
import { Axios } from "utils";

export const getAssessmentSections = async () => {
  const res = await Axios.get("/AssessmentSections");
  return res.data;
};

export const createAssessmentSections = async (payload) => {
  const res = await Axios.psot("/AssessmentSections", payload);
  return res.data;
};

export const updateAssessmentSections = async (payload) => {
  const res = await Axios.put("/AssessmentSections", payload);
  return res.data;
};

export const findAssessmentSection = async (id) => {
  const res = await Axios.get(`/AssessmentSections/${id}`);
  return res.data;
};

export const deleteAssessmentSections = async (id) => {
  const res = await Axios.delete(`/AssessmentSections/${id}`);
  return res.data;
};
