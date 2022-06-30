import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentList from "./containers/AssessmentList";
import CreateAssessment from "./containers/CreateAssessment";
import { useAssessment } from "./hooks";

const AssessmentSection = () => {
  const {
    assessmentQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessment,
    assessment,
    createAssessment,
    editAssessment,
  } = useAssessment();
  const { data, isLoading } = assessmentQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <AssessmentList
                data={data}
                isConfirmDelete={isConfirmDelete}
                onToggleModal={onToggleModal}
                onDelete={onDelete}
                assessment={assessment}
                onDeleteAssessment={onDeleteAssessment}
              />
            }
          />
          <Route path="/create/new" element={<CreateAssessment />} />
          <Route path="/edit/:id" element={<CreateAssessment />} />
        </Routes>
      )}
    </>
  );
};

export default AssessmentSection;
