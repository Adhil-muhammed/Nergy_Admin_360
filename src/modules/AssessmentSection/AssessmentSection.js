import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentSectionList from "./containers/AssessmentSectionList";
import CreateAssessmentSection from "./containers/CreateAssessmentSection";
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
          <Route
            path="/create/new"
            element={
              <CreateAssessmentSection
                createAssessmentSection={createAssessmentSection}
                editAssessmentSection={editAssessmentSection}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <CreateAssessmentSection
                createAssessmentSection={createAssessmentSection}
                editAssessmentSection={editAssessmentSection}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AssessmentSection;
