import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentSectionList from "./containers/AssessmentSectionList";
import { useAssessmentSection } from "./hooks";

const AssessmentSection = () => {
  const {
    assessmentSectionQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessmentSection,
    assessment,
    createAssessmentSection,
    editAssessmentSection,
  } = useAssessmentSection();

  const { isLoading, data } = assessmentSectionQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <AssessmentSectionList
                data={data}
                onDeleteAssessmentSection={onDeleteAssessmentSection}
                isConfirmDelete={isConfirmDelete}
                assessment={assessment}
                onToggleModal={onToggleModal}
                onDelete={onDelete}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AssessmentSection;
