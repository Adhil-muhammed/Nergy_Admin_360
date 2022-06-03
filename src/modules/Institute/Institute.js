import { InstituteList, useInstitute, CreateInstitute, EditInstitute } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Institute = () => {
  const {
    institute,
    setInstitute,
    institutesQuery,
    createInstitute,
    editInstitute,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteInstitute,
  } = useInstitute();

  const { data, isLoading } = institutesQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <InstituteList
                institute={institute}
                isConfirmDelete={isConfirmDelete}
                deleteInstitute={deleteInstitute}
                institutes={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateInstitute
                institute={institute}
                setInstitute={setInstitute}
                createInstitute={createInstitute}
              />
            }
          />
          <Route
            path="/edit/:instituteId"
            element={
              <EditInstitute
                institute={institute}
                setInstitute={setInstitute}
                editInstitute={editInstitute}
                onEdit={onEdit}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
