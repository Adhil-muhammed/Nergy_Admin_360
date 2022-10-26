import React from "react";
import { ProgramList, AddOrEditProgram } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

export const Program = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Program", "View") &&
          <Route path="/" element={<ProgramList />} />
        }
        {
          hasPermission("Program", "Create") &&
          <Route path="/create" element={<AddOrEditProgram />} />
        }
        {
          hasPermission("Program", "Edit") &&
          <Route path="/edit/:programId" element={<AddOrEditProgram />} />
        }
      </Routes>
    </>
  );
};
