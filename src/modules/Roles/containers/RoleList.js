import React from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { RoleFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useRole } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const RoleList = () => {
  const { role, rolesQuery, onDelete, onToggleModal, isConfirmDelete, deleteRole } = useRole({
    load: true,
  });

  const history = useNavigate();
  const location = useLocation();

  const { data, isLoading } = rolesQuery;

  const onConfirm = () => {
    deleteRole.mutate(role.roleId);
  };

  const onEdit = (roleId) => {
    history(`${location.pathname}/edit/${roleId}`);
  };

  const onEditPermission = (value) => {
    history(`${location.pathname}/permissions?userRole=${value}`);
  };

  const editPermissionButton = ({ row }) => {
    return (
      <>
        <Button
          color="success"
          size="sm"
          onClick={() => onEditPermission(row.original.name)}
          className="me-3"
        >
          <i className="bi bi-gear" style={{ fontSize: "10px" }}></i> <span>Permissions</span>
        </Button>

      </>
    );
  };

  const ActionButtons = ({ row }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.roleId)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => onDelete(row.original.roleId)}
          className="ms-3"
        >
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Permission",
      id: "Permission",
      accessor: "name",
      key: "actions",
      Cell: editPermissionButton,
    },
    {
      Header: "Actions",
      id: "actions",
      accessor: "roleId",
      key: "actions",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Roles"} subtitle={"List"} breadcrumb={[{ label: "Roles" }]}>
      <RoleFilter />
      <TableLayout columns={columns} data={data} />
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
