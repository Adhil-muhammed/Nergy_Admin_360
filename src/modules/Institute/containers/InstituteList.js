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
        accessor: "instituteId",
        id: "actions",
        Cell: ActionButtons,
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
