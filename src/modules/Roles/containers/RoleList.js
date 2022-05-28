import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout } from "shared/components";
import { RoleFilter } from "..";
import { Button } from "reactstrap";

export const RoleList = (props) => {
  const { roles, onEdit, onDelete } = props;

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
    </ContentLayout>
  );
};
