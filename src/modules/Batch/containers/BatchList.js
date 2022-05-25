import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { BatchFilter } from "..";
import { Button } from "reactstrap";

export const BatchList = (props) => {
  const { batch, batches, onEdit, onDelete, onToggleModal, isConfirmDelete, deleteBatch } = props;

  const onConfirm = () => {
    deleteBatch.mutate(batch.batchId);
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
        Header: "Start",
        accessor: "startDate",
      },
      {
        Header: "End",
        accessor: "endDate",
      },

      {
        Header: "Edit",
        accessor: "batchId",
        id: "edtitBatch",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteBatch",
        accessor: "batchId",
        key: "deleteBatch",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: batches,
  });

  return (
    <ContentLayout title={"Batches"}>
      <BatchFilter />
      <TableLayout table={table} />
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
