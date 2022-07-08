import { UserList, CreateUser } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Users = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:userId" element={<CreateUser />} />
      </Routes>
    </>
  );
};
