import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { CourseIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const CourseList = (props) => {
  const { course, courses, onDelete, onToggleModal, isConfirmDelete, deleteCourse } = props;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteCourse.mutate(course.courseId);
  };

  const onEdit = (courseId) => {
    history(`${location.pathname}/edit/${courseId}`);
  };

  const HasExam = ({ value }) => {
    return <span style={{ color: value ? "#495057" : "#b61c1c" }}>{value ? "True" : "False"}</span>;
  };

  const ContentEnabled = ({ value }) => {
    return <span style={{ color: value ? "#495057" : "#b61c1c" }}>{value ? "True" : "False"}</span>;
  };

  const EditCell = ({ value }) => {
    return (
      <Button outline color="primary" onClick={() => onEdit(value)}>
        Edit
      </Button>
    );
  };

  const DeleteCell = ({ value }) => {
    return (
      <Button color="danger" onClick={() => onDelete(value)}>
        Delete
      </Button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Instructions",
        accessor: "instructions",
      },
      {
        Header: "Has Exam",
        accessor: "hasExam",
        Cell: HasExam,
      },
      {
        Header: "Content Enabled",
        accessor: "isContentEnabled",
        Cell: ContentEnabled,
      },
      {
        Header: "Edit",
        accessor: "courseId",
        id: "editCourse",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteCourse",
        accessor: "courseId",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: courses,
  });

  return (
    <ContentLayout title={"Courses"} subtitle={"List"}>
      <CourseIdFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${course.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
