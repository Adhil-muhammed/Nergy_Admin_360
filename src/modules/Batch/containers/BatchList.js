import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { BatchFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useBatch } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const BatchList = () => {
  const { batch, batchesQuery, onDelete, onToggleModal, isConfirmDelete, deleteBatch } = useBatch({
    load: true,
  });

  const { data, isLoading } = batchesQuery;
  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteBatch.mutate(batch.batchId);
  };

  const onEdit = (batchId) => {
    history(`${location.pathname}/edit/${batchId}`);
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

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Start",
      accessor: "startDate",
    },
    {
      Header: "End",
      accessor: "endDate",
    },

    {
      Header: "Actions",
      accessor: "batchId",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Batch"}
      subtitle={"List"}
      breadcrumb={[{ label: "Batch", location: "/batch" }]}
    >
      <BatchFilter />
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete batch ${batch.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
