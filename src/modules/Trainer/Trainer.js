import React from "react";
import { Routes, Route } from "react-router-dom";
import { TrainerList, AddOrEditTrainer } from ".";

export const Trainer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TrainerList />} />
        <Route path="/create" element={<AddOrEditTrainer />} />
        <Route path="/edit/:trainerId" element={<AddOrEditTrainer />} />
      </Routes>
    </>
  );
};
