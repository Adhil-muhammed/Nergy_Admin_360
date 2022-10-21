import React from "react";
import { RoleList, CreateRole, PermissionList } from ".";
import { Routes, Route } from "react-router-dom";

export const Role = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleList />} />
      <Route path="/permissions" element={<PermissionList />} />
      <Route path="/create" element={<CreateRole />} />
      <Route path="/edit/:roleId" element={<CreateRole />} />
    </Routes>
  );
};
