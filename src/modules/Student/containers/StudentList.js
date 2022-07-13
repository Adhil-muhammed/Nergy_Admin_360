import React, { useMemo } from "react";
import { ContentLayout, PaginationTableLayout, ModalLayout } from "shared/components";
import { StudentFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useStudent } from "../hooks";

export const StudentList = () => {
  const {
    student,
    studentsQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteStudent,
    fetchData,
    page,
    setPage,
  } = useStudent({
    load: true,
  });
  const { data, isLoading } = studentsQuery;
  const { data: students, totalPages, hasNext, hasPrevious, totalCount } = !isLoading && data;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteStudent.mutate(student.studentId);
  };

  const onEdit = (studentId) => {
    history(`${location.pathname}/edit/${studentId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Registration Id",
        accessor: "registrationId",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },

      {
        Header: "Actions",
        accessor: "studentId",
        id: "actions",
        Cell: ActionButtons,
      },
    ],
    []
  );

  return (
    <ContentLayout title={"Student"} subtitle={"List"} isLoading={isLoading}>
      <StudentFilter />
      <PaginationTableLayout
        columns={columns}
        data={students}
        controlledPageCount={totalPages}
        controlledpageNo={page.pageIndex}
        controlledpageSize={page.pageSize}
        fetchData={fetchData}
        setPage={setPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete students ${student.firstName}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
