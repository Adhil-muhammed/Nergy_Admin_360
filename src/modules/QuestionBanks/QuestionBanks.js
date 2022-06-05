import { QuestionBanksList, useQuestionBanks, CreateQuestionBanks, EditQuestionBanks } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const QuestionBanks = () => {
  const {
    questionBank,
    setQuestionBank,
    questionBanksQuery,
    createQuestionBank,
    editQuestionBank,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteQuestionBank,
  } = useQuestionBanks();

  const { data, isLoading } = questionBanksQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <QuestionBanksList
                questionBank={questionBank}
                isConfirmDelete={isConfirmDelete}
                deleteQuestionBank={deleteQuestionBank}
                questionBanks={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateQuestionBanks
                questionBank={questionBank}
                setQuestionBank={setQuestionBank}
                createQuestionBank={createQuestionBank}
              />
            }
          />
          <Route
            path="/edit/:questionBankId"
            element={
              <EditQuestionBanks
                questionBank={questionBank}
                setQuestionBank={setQuestionBank}
                editQuestionBank={editQuestionBank}
                onEdit={onEdit}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
