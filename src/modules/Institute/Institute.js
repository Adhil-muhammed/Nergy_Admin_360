import { InstituteList, AddOrEditInstitute } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Institute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<InstituteList />} />
        <Route path="/create" element={<AddOrEditInstitute />} />
        <Route path="/edit/:instituteId" element={<AddOrEditInstitute />} />
      </Routes>
    </>
  );
};
