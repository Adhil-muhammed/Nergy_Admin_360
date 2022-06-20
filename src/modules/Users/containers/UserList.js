import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { UserIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const UserList = (props) => {
  const { user, users, onDelete, onToggleModal, isConfirmDelete, deleteUser } = props;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteUser.mutate(user.userId);
  };

  const onEdit = (userId) => {
    history(`${location.pathname}/edit/${userId}`);
  };

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
        Header: "First name",
        accessor: "firstName",
      },
      {
        Header: "Last name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Is active",
        accessor: "isActive",
      },
      {
        Header: "Edit",
        id: "editUser",
        accessor: "userId",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteUser",
        accessor: "userId",
        key: "deleteCourse",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: users,
  });

  return (
    <ContentLayout title={"Users"} subtitle={"List"}>
      <UserIdFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${user.firstName}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
