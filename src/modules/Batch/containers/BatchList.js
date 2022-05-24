import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, EditCell, DeleteCell } from "shared/components";
import { BatchFilter } from "..";

export const BatchList = (props) => {
  const { batches } = props;
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
