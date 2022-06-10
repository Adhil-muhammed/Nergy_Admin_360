import { CourseList, useCourse, CreateCourse, EditCourse } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  const {
    course,
    setCourse,
    coursesQuery,
    createCourse,
    editCourse,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteCourse,
  } = useCourse();

  const { data, isLoading } = coursesQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <CourseList
                course={coursesQuery}
                isConfirmDelete={isConfirmDelete}
                deleteCourse={deleteCourse}
                courses={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateCourse
                course={course}
                setCourse={setCourse}
                createCourse={createCourse}
              />
            }
          />
          <Route
            path="/edit/:courseId"
            element={
              <EditCourse
                course={course}
                setCourse={setCourse}
                editCourse={editCourse}
                onEdit={onEdit}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

