import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout } from "shared/components";

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
    ],
    []
  );
  const table = useTable({
    columns,
    data: batches,
  });

  return (
    <ContentLayout title={"Batches"}>
      <TableLayout table={table} />
    </ContentLayout>
  );
};
