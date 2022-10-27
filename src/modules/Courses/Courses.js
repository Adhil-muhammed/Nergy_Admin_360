import React from "react";
import { CourseList, AddCourse, EditCourse, CreateCourseSection, EditSection, AddContent, EditContent } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

export const Courses = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <Routes>
      {
        hasPermission("Courses", "View") &&
        <Route path="/" element={<CourseList />} />
      }
      {
        hasPermission("Courses", "Create") &&
        <Route path="/create" element={<AddCourse />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/:courseId" element={<EditCourse />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/section/create" element={<CreateCourseSection />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/section/edit" element={<EditSection />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/section/content/create" element={<AddContent />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/section/content/create" element={<AddContent />} />
      }
      {
        hasPermission("Courses", "Edit") &&
        <Route path="/section/content/edit" element={<EditContent />} />
      }
    </Routes>
  );
};
