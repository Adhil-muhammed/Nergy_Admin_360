import { TrainingPartnerList, AddOrEditTrainingPartner } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const TrainingPartner = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TrainingPartnerList />} />
        <Route path="/create" element={<AddOrEditTrainingPartner />} />
        <Route path="/edit/:trainingPartnerId" element={<AddOrEditTrainingPartner />} />
      </Routes>
    </>
  );
};
