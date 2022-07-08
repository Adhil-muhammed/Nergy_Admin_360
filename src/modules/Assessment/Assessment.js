import React from "react";
import { Route, Routes } from "react-router-dom";
import { AssessmentList, CreateAssessment } from ".";

const AssessmentSection = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssessmentList />} />
        <Route path="/create/new" element={<CreateAssessment />} />
        <Route path="/edit/:id" element={<CreateAssessment />} />
      </Routes>
    </>
  );
};

export default AssessmentSection;
