import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout,ModalLayout } from "shared/components";
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Edit",
        accessor: "roleId",
        id: "edtitRole",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteRole",
        accessor: "roleId",
        key: "deleteRole",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: roles,
  });

  return (
    <ContentLayout title={"Roles"}>
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
