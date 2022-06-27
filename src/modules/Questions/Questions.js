import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateQuestion, QuestionsList } from "./containers";
import { useQuestion } from "./hooks";

export const Questions = () => {
  const {
    questionsQuery,
    state,
    setState,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteQuestion,
    question,
  } = useQuestion();
  const { data, isLoading } = questionsQuery;

  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <QuestionsList
                data={data}
                question={question}
                isConfirmDelete={isConfirmDelete}
                onToggleModal={onToggleModal}
                onDelete={onDelete}
                onDeleteQuestion={onDeleteQuestion}
              />
            }
          />
          <Route path="/create" element={<CreateQuestion state={state} setState={setState} />} />
        </Routes>
      )}
    </>
  );
};
