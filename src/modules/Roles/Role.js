import React from "react";
import { RoleList, CreateRole } from ".";
import { Routes, Route } from "react-router-dom";

export const Role = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleList />} />
      <Route path="/create" element={<CreateRole />} />
      <Route path="/edit/:roleId" element={<CreateRole />} />
    </Routes>
  );
};
