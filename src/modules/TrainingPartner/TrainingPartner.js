import { TrainingPartnerList, AddOrEditTrainingPartner } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

import React from "react";

export const TrainingPartner = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("TrainingPartner", "View") &&
          <Route path="/" element={<TrainingPartnerList />} />
        }
        {
          hasPermission("TrainingPartner", "View") &&
          <Route path="/create" element={<AddOrEditTrainingPartner />} />
        }
        {
          hasPermission("TrainingPartner", "View") &&
          <Route path="/edit/:trainingPartnerId" element={<AddOrEditTrainingPartner />} />
        }
      </Routes>
    </>
  );
};
