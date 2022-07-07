import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateQuestion, QuestionsList } from "./containers";

export const Questions = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuestionsList />} />
        <Route path="/create/new" element={<CreateQuestion />} />
        <Route path="/edit/:id" element={<CreateQuestion />} />
      </Routes>
    </>
  );
};
