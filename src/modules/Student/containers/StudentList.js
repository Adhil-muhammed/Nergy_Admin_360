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

  const onEdit = (studentId) => {
    history(`${location.pathname}/edit/${studentId}`);
  };

  const EditCell = ({ value }) => {
    return (
      <Button className="btn btn-primary me-1 mb-1" onClick={() => onEdit(value)}>
        Edit
      </Button>
    );
  };

  const DeleteCell = ({ value }) => {
    return (
      <Button className="btn btn-primary me-1 mb-1" onClick={() => onDelete(value)}>
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
        accessor: "studentId",
        id: "edtitBatch",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteBatch",
        accessor: "studentId",
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
    <ContentLayout title={"Students"}>
      <StudentFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete students ${students.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
