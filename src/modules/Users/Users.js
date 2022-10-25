import { UserList, CreateUser } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Users = (props) => {
  const { hasPermission } = props;
  return (
    <>
      <Routes>
        {
          hasPermission("Users", "View") &&
          <Route path="/" element={<UserList />} />
        }
        {
          hasPermission("Users", "Create") &&
          <Route path="/create" element={<CreateUser />} />
        }
        {
          hasPermission("Users", "Edit") &&
          <Route path="/edit/:userId" element={<CreateUser />} />
        }
      </Routes>
    </>
  );
};
