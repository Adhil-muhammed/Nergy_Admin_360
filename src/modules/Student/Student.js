import { StudentList, useStudent, CreateStudent, EditStudent } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Student = () => {
  const {
    student,
    setStudent,
    studentsQuery,
    createStudent,
    editStudent,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteStudent,
    fetchData,
    batchesQuery,
    institutesQuery,
  } = useStudent();

  const { data, isLoading } = studentsQuery;
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
                data={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
                fetchData={fetchData}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateStudent
                student={student}
                setStudent={setStudent}
                createStudent={createStudent}
                batchesQuery={batchesQuery}
                institutesQuery={institutesQuery}
              />
            }
          />
          <Route
            path="/edit/:studentUserId"
            element={
              <EditStudent
                student={student}
                setStudent={setStudent}
                editStudent={editStudent}
                onEdit={onEdit}
                batchesQuery={batchesQuery}
                institutesQuery={institutesQuery}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
