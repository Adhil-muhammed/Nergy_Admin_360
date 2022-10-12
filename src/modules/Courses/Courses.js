import { CourseList, AddCourse, EditCourse, CreateCourseSection } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create" element={<AddCourse />} />
      <Route path="/edit/:courseId" element={<EditCourse />} />
      <Route path="/sections/create" element={<CreateCourseSection />} />
      <Route path="/sections/edit" element={<div>edit section</div>} />
      <Route path="/sections/contents" element={<div>contents</div>} />
      <Route path="/sections/contents" element={<div>contents</div>} />
      <Route path="/sections/contents/create/new" element={<div>contents</div>} />
    </Routes>
  );
};
