import React from "react";
import { Routes, Route } from "react-router-dom";
import { TrainerList, AddOrEditTrainer } from ".";
import { useAuthorizeContext } from "master";

export const Trainer = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Trainer", "View") &&
          <Route path="/" element={<TrainerList />} />

        }
        {
          hasPermission("Trainer", "Create") &&
          <Route path="/create" element={<AddOrEditTrainer />} />

        }
        {
          hasPermission("Trainer", "Edit") &&
          <Route path="/edit/:trainerId" element={<AddOrEditTrainer />} />

        }
      </Routes>
    </>
  );
};
