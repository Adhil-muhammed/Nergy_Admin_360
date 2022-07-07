import { QuestionBanksList, CreateOrEditQuestionBanks } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const QuestionBanks = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuestionBanksList />} />
        <Route path="/create" element={<CreateOrEditQuestionBanks />} />
        <Route path="/edit/:questionBankId" element={<CreateOrEditQuestionBanks />} />
      </Routes>
    </>
  );
};
