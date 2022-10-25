import { QuestionBanksList, CreateOrEditQuestionBanks } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const QuestionBanks = (props) => {
  const { hasPermission } = props;

  return (
    <>
      <Routes>
        {
          hasPermission("QuestionBanks", "View") &&
          <Route path="/" element={<QuestionBanksList hasPermission={hasPermission} />} />
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
