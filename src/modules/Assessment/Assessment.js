import React from "react";
import { Route, Routes } from "react-router-dom";
import { AssessmentList, CreateAssessment } from ".";
import { useAuthorizeContext } from "master";


const AssessmentSection = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Assessments", "View") &&
          <Route path="/" element={<AssessmentList />} />
        }
        {
          hasPermission("Assessments", "Create") &&
          <Route path="/create/new" element={<CreateAssessment />} />
        }
        {
          hasPermission("Assessments", "Edit") &&
          <Route path="/edit/:id" element={<CreateAssessment />} />
        }
      </Routes>
    </>
  );
};

export default AssessmentSection;
