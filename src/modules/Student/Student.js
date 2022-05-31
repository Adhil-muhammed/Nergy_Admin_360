import { StudentList, useStudent, CreateStudent, EditStudent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Student = () => {
  const {
    student,
    setStudent,
    batchesQuery,
    createStudent,
    editStudent,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteStudent,
  } = useStudent();

  const { data, isLoading } = batchesQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <StudentList
                student={student}
                isConfirmDelete={isConfirmDelete}
                deleteStudent={deleteStudent}
                students={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateStudent
                student={student}
                setStudent={setStudent}
                createBatch={createStudent}
              />
            }
          />
          <Route
            path="/edit/:batchId"
            element={
              <EditStudent
                student={student}
                setStudent={setStudent}
                editStudent={editStudent}
                onEdit={onEdit}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
