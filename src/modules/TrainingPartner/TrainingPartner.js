import { TrainingPartnerList } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const TrainingPartner = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TrainingPartnerList />} />
      </Routes>
    </>
  );
};
