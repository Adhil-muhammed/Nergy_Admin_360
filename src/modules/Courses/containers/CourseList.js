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

  const CheckMarker = ({ value }) => {
    return (
      <span style={{ color: value ? "#3fba2d" : "#da1a1a", fontSize: '24px' }}>
        <i className={`bi ${value ? "bi-check" : "bi-x"}`}></i>
      </span>
    );
  };

  const Thumbnail =({value}) => {
    return (
      value ? <img style={{height: '40px'}} src={value} /> : 'No image'
    )
  }

  const EditCell = ({ value }) => {
    return (
      <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
        <i class="bi bi-pencil-square" style={{fontSize: '10px'}}></i> <span>Edit</span>
      </Button>
    );
  };

  const DeleteCell = ({ value }) => {
    return (
      <Button color="danger" size="sm" onClick={() => onDelete(value)}>
        <i class="bi bi-trash" style={{fontSize: '10px'}}></i> <span>Delete</span>
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
        Header: "Exam",
        accessor: "hasExam",
        Cell: CheckMarker,
      },
      {
        Header: "Content",
        accessor: "isContentEnabled",
        Cell: CheckMarker,
      },
      {
        Header: "Thumbnail",
        accessor: "courseImage",
        Cell: Thumbnail,
      },
      {
        Header: "Edit",
        id: "editCourse",
        accessor: "courseId",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteCourse",
        accessor: "courseId",
        key: "deleteCourse",
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
