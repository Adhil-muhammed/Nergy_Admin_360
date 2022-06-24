import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { RoleFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const RoleList = (props) => {
  const { role, roles, onDelete, onToggleModal, isConfirmDelete, deleteRole } = props;

  const history = useNavigate();
  const location = useLocation();

  const onConfirm = () => {
    deleteRole.mutate(role.roleId);
  };

  const onEdit = (roleId) => {
    history(`${location.pathname}/edit/${roleId}`);
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "roleId",
        key: "actions",
        Cell: ActionButtons,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: roles,
  });

  return (
    <ContentLayout title={"Roles"} subtitle={"List"}>
      <RoleFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete role ${role.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
