import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { StudentFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const StudentList = (props) => {
  const { student, data, onDelete, onToggleModal, isConfirmDelete, deleteStudent } = props;
  const { value: students } = data;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteStudent.mutate(student.studentId);
  };

  const onEdit = (studentUserId) => {
    history(`${location.pathname}/edit/${studentUserId}`);
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
        Header: "Edit",
        accessor: "studentUserId",
        id: "edtitBatch",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteBatch",
        accessor: "studentUserId",
        key: "deleteBatch",
        Cell: DeleteCell,
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: students,
  });

  return (
    <ContentLayout title={"Students"} subtitle={"List"}>
      <StudentFilter />
      <TableLayout table={table} />
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
