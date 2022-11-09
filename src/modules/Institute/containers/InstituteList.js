import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { InstituteIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useInstitute } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";

export const InstituteList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Institutes", "Create");
  const hasEditPermission = hasPermission("Institutes", "Edit");
  const hasDeletePermission = hasPermission("Institutes", "Delete");

  const history = useNavigate();
  const location = useLocation();

  const { institute, institutesQuery, onDelete, onToggleModal, isConfirmDelete, deleteInstitute } =
    useInstitute({ load: true });
  const { data, isLoading } = institutesQuery;

  const onConfirm = () => {
    deleteInstitute.mutate(institute.instituteId);
  };

  const onEdit = (instituteId) => {
    history(`${location.pathname}/edit/${instituteId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission && <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission && <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
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
    }
  ];

  if (hasEditPermission || hasDeletePermission) {
    columns.push({
      Header: "Actions",
      accessor: "instituteId",
      id: "actions",
      Cell: ActionButtons,
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Institutes"} subtitle={"List"} breadcrumb={[{ label: "Institute" }]}>
      {
        hasCreatePermission && <InstituteIdFilter />
      }
      <TableLayout columns={columns} data={data} />
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
