import { CourseList, AddOrEditCourse } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create/new" element={<AddOrEditCourse />} />
      <Route path="/edit/:courseId" element={<AddOrEditCourse />} />
    </Routes>
  );
};
