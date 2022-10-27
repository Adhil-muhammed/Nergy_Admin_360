import { InstituteList, AddOrEditInstitute } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";


import React from "react";

export const Institute = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<InstituteList />} />
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
