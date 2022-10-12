import { CourseList, AddCourse, EditCourse, CreateCourseSection, EditSection, AddContent, EditContent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create/new" element={<AddCourse />} />
      <Route path="/:courseId" element={<EditCourse />} />
      <Route path="/section/create" element={<CreateCourseSection />} />
      <Route path="/section/edit" element={<EditSection />} />
      <Route path="/sections/contents/create" element={<AddContent />} />
      <Route path="/sections/contents/edit" element={<EditContent />} />
    </Routes>
  );
};
