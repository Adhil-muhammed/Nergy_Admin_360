import { QuestionBanksList, CreateOrEditQuestionBanks } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";


import React from "react";

export const QuestionBanks = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("QuestionBanks", "View") &&
          <Route path="/" element={<QuestionBanksList />} />
        }
        {
          hasPermission("QuestionBanks", "Create") &&
          <Route path="/create" element={<CreateOrEditQuestionBanks />} />
        }
        {
          hasPermission("QuestionBanks", "Edit") &&
          <Route path="/edit/:questionBankId" element={<CreateOrEditQuestionBanks />} />
        }
      </Routes>
    </>
  );
};
