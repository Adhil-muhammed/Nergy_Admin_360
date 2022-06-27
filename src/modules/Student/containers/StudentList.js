import React, { useMemo } from "react";
import { ContentLayout, PaginationTableLayout, ModalLayout } from "shared/components";
import { StudentFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const StudentList = (props) => {
  const { student, data, onDelete, onToggleModal, isConfirmDelete, deleteStudent, fetchData } =
    props;
  const { value: students, paging } = data;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteStudent.mutate(student.studentUserId);
  };

  const onEdit = (studentUserId) => {
    history(`${location.pathname}/edit/${studentUserId}`);
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
        accessor: "studentUserId",
        id: "actions",
        Cell: ActionButtons,
      },
    ],
    []
  );

  return (
    <ContentLayout title={"Students"} subtitle={"List"}>
      <StudentFilter />
      <PaginationTableLayout
        columns={columns}
        data={students}
        controlledPageCount={paging.pageCount}
        controlledpageNo={paging.pageNo}
        controlledpageSize={paging.pageSize}
        fetchData={fetchData}
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
