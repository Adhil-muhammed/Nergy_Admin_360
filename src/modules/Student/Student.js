import React from "react";
import { StudentList, CreateStudent } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";



export const Student = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<StudentList />} />
        {
          hasPermission("Students", "Create") &&
          <Route path="/create" element={<CreateStudent />} />
        }
        {
          hasPermission("Students", "Edit") &&
          <Route path="/edit/:studentId" element={<CreateStudent />} />

        }
        <Route path="/*" element={<h5>Not Found</h5>} />
      </Routes>
    </>
  );
};
