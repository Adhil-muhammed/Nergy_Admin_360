import React from "react";
import { RoleList, CreateRole, PermissionList } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

export const Role = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <Routes>
      {
        hasPermission("UserRoles", "View") &&
        <Route path="/" element={<RoleList />} />
      }
      {
        hasPermission("UserRoles", "Edit") &&
        <Route path="/edit/:roleId" element={<CreateRole />} />
      }
      {
        hasPermission("UserRoles", "Create") &&
        <Route path="/create" element={<CreateRole />} />
      }
      {
        (hasPermission("UserRoles", "Edit") || hasPermission("UserRoles", "View")) &&
        <Route path="/permissions" element={<PermissionList />} />
      }
    </Routes>
  );
};
