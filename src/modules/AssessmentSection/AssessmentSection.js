import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentSectionList from "./containers/AssessmentSectionList";
import CreateAssessmentSection from "./containers/CreateAssessmentSection";
import { useAuthorizeContext } from "master";

const AssessmentSection = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("AssessmentSections", "View") &&
          <Route path="/" element={<AssessmentSectionList />} />
        }
        {
          hasPermission("AssessmentSections", "Create") &&
          <Route path="/create/new" element={<CreateAssessmentSection />} />
        }
        {
          hasPermission("AssessmentSections", "Edit") &&
          <Route path="/edit/:id" element={<CreateAssessmentSection />} />
        }
      </Routes>
    </>
  );
};

export default AssessmentSection;
