import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { UserIdFilter } from "..";
import { Button, Badge } from "reactstrap";
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

  const StatusIndicator = ({ value }) => {
    return <Badge color={value === "Active" ? "success" : "secondary"}>{value}</Badge>;
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
        Header: "Status",
        accessor: "userStatusStr",
        Cell: StatusIndicator,
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "userId",
        Cell: ActionButtons,
      },
    ],
    []
  );
  return (
    <ContentLayout title={"Users"} subtitle={"List"}>
      <UserIdFilter />
      <TableLayout columns={columns} data={users} />
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
