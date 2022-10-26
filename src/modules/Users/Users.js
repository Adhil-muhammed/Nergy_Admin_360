import React from "react";
import { UserList, CreateUser } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";


export const Users = () => {
  const { hasPermission } = useAuthorizeContext();

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
