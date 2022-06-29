import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateQuestion, QuestionsList } from "./containers";
import { useQuestion } from "./hooks";

export const Questions = () => {
  const {
    questionsQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteQuestion,
    question,
    createQuestion,
    editQuestion,
    getQuestion,
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
                getQuestion={getQuestion}
              />
            }
          />
          <Route
            path="/create/new"
            element={
              <CreateQuestion
                createQuestion={createQuestion}
                editQuestion={editQuestion}
                getQuestion={getQuestion}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={<CreateQuestion createQuestion={createQuestion} editQuestion={editQuestion} />}
          />
        </Routes>
      )}
    </>
  );
};
