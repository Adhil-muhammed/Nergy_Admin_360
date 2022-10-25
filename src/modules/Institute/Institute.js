import { InstituteList, AddOrEditInstitute } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Institute = (props) => {
  const { hasPermission } = props;
  return (
    <>
      <Routes>
        <Route path="/" element={<InstituteList hasPermission={hasPermission} />} />
        {
          hasPermission("Institutes", "Create") &&
          <Route path="/create" element={<AddOrEditInstitute />} />
        }
        {
          hasPermission("Institutes", "Edit") &&
          <Route path="/edit/:instituteId" element={<AddOrEditInstitute />} />
        }
      </Routes>
    </>
  );
};
