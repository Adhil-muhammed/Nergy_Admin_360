import { CourseList, AddCourse, EditCourse, CreateCourseSection } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create/new" element={<AddCourse />} />
      <Route path="/:courseId" element={<EditCourse />} />
      <Route path="/sections/create" element={<CreateCourseSection />} />
      <Route path="/section/edit" element={<div>edit section</div>} />
      <Route path="/sections/contents/create" element={<div>create contents</div>} />
      <Route path="/sections/contents/edit" element={<div>edit contents</div>} />
    </Routes>
  );
};
