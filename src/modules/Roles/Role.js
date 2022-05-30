import { RoleList, useRole, CreateRole, EditRole } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Role = () => {
  const { role, setRole, createRole, rolesQuery, editRole, onEdit, onDelete, deleteRole, onToggleModal, isConfirmDelete } = useRole();
  const { data, isLoading } = rolesQuery;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoading || !data ? (
            <div>Loading</div>
          ) : (
            <RoleList role={role}
            isConfirmDelete={isConfirmDelete}
            deleteRole={deleteRole}
roles={data} onToggleModal={onToggleModal} onDelete={onDelete} />
          )
        }
      />
      <Route
        path="/create"
        element={<CreateRole role={role} setRole={setRole} createRole={createRole} />}
      />
      <Route
        path="/edit/:roleId"
        element={<EditRole role={role} setRole={setRole} editRole={editRole} onEdit={onEdit} />}
      />
    </Routes>
  );
};
