import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { ProgramFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useProgram } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";


export const ProgramList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Program", "Create");
  const hasEditPermission = hasPermission("Program", "Edit");
  const hasDeletePermission = hasPermission("Program", "Delete");

  const { program,
    programsQuery,
    deteleProgram,
    onDelete,
    onToggleModal, isConfirmDelete } = useProgram({ load: true });

  const { data, isLoading } = programsQuery;
  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deteleProgram.mutate(program.id);
  };

  const onEdit = (programId) => {
    history(`${location.pathname}/edit/${programId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission &&
          <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission &&
          <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },

  ];

  if (hasDeletePermission || hasEditPermission) {
    columns.push({
      Header: "Actions",
      accessor: "id",
      id: "actions",
      Cell: ActionButtons,
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Program"} subtitle={"List"} breadcrumb={[{ label: "Program" }]}>
      {
        hasCreatePermission && <ProgramFilter />
      }
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${program.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
