import { CourseList, useCourse, CreateCourse, EditCourse } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Courses = () => {
  const {
    course,
    setCourse,
    currentCourse,
    courseContent,
    setCourseContent,
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
                // course={course}
                currentCourse={currentCourse}
                isConfirmDelete={isConfirmDelete}
                deleteCourse={deleteCourse}
                courses={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create/new"
            element={
              <CreateCourse
                // course={course}
                setCourse={setCourse}
                createCourse={createCourse}
                editCourse={editCourse}
              />
            }
          />
          <Route
            path="/edit/:courseId"
            element={
              // <EditCourse
              //   course={course}
              //   setCourse={setCourse}
              //   editCourse={editCourse}
              //   onEdit={onEdit}
              // />
              <CreateCourse
                createCourse={createCourse}
                editCourse={editCourse}
                // onEdit={onEdit}
                // course={course}
                // courseContent={courseContent}
                // setCourseContent={setCourseContent}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
