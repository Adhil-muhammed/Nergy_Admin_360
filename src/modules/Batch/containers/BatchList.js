import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout } from "shared/components";
import { BatchFilter } from "..";
import { Button } from "reactstrap";

export const BatchList = (props) => {
  const { batches, onEdit, onDelete } = props;

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
    </ContentLayout>
  );
};
