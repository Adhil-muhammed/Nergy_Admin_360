import { CourseList, AddCourse, EditCourse, CreateCourseSection, EditSection, AddContent, EditContent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create" element={<AddCourse />} />
      <Route path="/:courseId" element={<EditCourse />} />
      <Route path="/section/create" element={<CreateCourseSection />} />
      <Route path="/section/edit" element={<EditSection />} />
      <Route path="/section/content/create" element={<AddContent />} />
      <Route path="/section/content/edit" element={<EditContent />} />
    </Routes>
  );
};
