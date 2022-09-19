import React from "react";
import { ProgramList, AddOrEditProgram } from ".";
import { Routes, Route } from "react-router-dom";

export const Program = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProgramList />} />
        <Route path="/create" element={<AddOrEditProgram />} />
        <Route path="/edit/:programId" element={<AddOrEditProgram />} />
      </Routes>
    </>
  );
};
