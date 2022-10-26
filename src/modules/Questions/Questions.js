import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateQuestion, QuestionsList } from "./containers";
import { useAuthorizeContext } from "master";


export const Questions = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Questions", "View") &&
          <Route path="/" element={<QuestionsList />} />
        }
        {
          hasPermission("Questions", "Create") &&
          <Route path="/create/new" element={<CreateQuestion />} />
        }
        {
          hasPermission("Questions", "Edit") &&
          <Route path="/edit/:id" element={<CreateQuestion />} />
        }
      </Routes>
    </>
  );
};
