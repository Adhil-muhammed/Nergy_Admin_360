import { RoleList, useRole, CreateRole, EditRole } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Role = () => {
  const { role, setRole, createRole, rolesQuery, editRole, onEdit, onDelete } = useRole();
  const { data, isLoading } = rolesQuery;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoading || !data ? (
            <div>Loading</div>
          ) : (
            <RoleList roles={data} onEdit={onEdit} onDelete={onDelete} />
          )
        }
      />
      <Route
        path="/create"
        element={<CreateRole role={role} setRole={setRole} createRole={createRole} />}
      />
      <Route
        path="/edit"
        element={<EditRole role={role} setRole={setRole} editRole={editRole} />}
      />
    </Routes>
  );
};
