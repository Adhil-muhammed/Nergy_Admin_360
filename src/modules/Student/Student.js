import { StudentList, useStudent, CreateStudent, EditStudent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Student = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/edit/:studentId" element={<CreateStudent />} />
      </Routes>
    </>
  );
};
