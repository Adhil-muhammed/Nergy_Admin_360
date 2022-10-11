import { CourseList, AddOrEditCourse, SectionList } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create" element={<AddOrEditCourse />} />
      <Route path="/edit" element={<AddOrEditCourse />} />
      <Route path="/sections" element={<SectionList />} />
      <Route path="/sections/create" element={<div>create section</div>} />
      <Route path="/sections/edit" element={<div>edit section</div>} />
      <Route path="/sections/contents" element={<div>contents</div>} />
      <Route path="/sections/contents" element={<div>contents</div>} />
      <Route path="/sections/contents/create/new" element={<div>contents</div>} />
    </Routes>
  );
};
