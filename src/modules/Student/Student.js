import { StudentList, CreateStudent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Student = (props) => {
  const { hasPermission } = props;
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentList hasPermission={hasPermission} />} />
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
