import { UserList, useUser, CreateUser, EditUser } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Users = () => {
  const {
    user,
    setUser,
    usersQuery,
    createUser,
    editUser,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteUser,
  } = useUser();

  const { data, isLoading } = usersQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <UserList
                user={user}
                isConfirmDelete={isConfirmDelete}
                deleteUser={deleteUser}
                users={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateUser
                user={user}
                setUser={setUser}
                createUser={createUser}
              />
            }
          />
          <Route
            path="/edit/:userId"
            element={
              <EditUser
                user={user}
                setUser={setUser}
                editUser={editUser}
                onEdit={onEdit}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

