import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { InstituteIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const InstituteList = (props) => {
  const { institute, institutes, onDelete, onToggleModal, isConfirmDelete, deleteInstitute } =
    props;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteInstitute.mutate(institute.instituteId);
  };

  const onEdit = (instituteId) => {
    history(`${location.pathname}/edit/${instituteId}`);
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Edit",
        accessor: "instituteId",
        id: "editInstitute",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteInstitute",
        accessor: "instituteId",
        key: "deleteInstitute",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: institutes,
  });

  return (
    <ContentLayout title={"Institutes"} subtitle={"List"}>
      <InstituteIdFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${institute.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
