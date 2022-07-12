import React from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import GlobalFilter from "./TableLayout";

export const PaginationTableLayout = (props) => {
  const {
    columns,
    data,
    controlledPageCount,
    controlledpageNo,
    controlledpageSize,
    fetchData,
    setPage,
    hasNext,
    hasPrevious,
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    globalFilteredRows,
    setGlobalFilter,
    pageOptions,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: controlledpageNo, pageSize: controlledpageSize },
      manualPagination: true,
      pageCount: controlledPageCount,
    },

    useFilters,
    useGlobalFilter,
    usePagination
  );

  React.useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-sm-2">
          <div className="">
            <select
              className="form-control"
              value={controlledpageSize}
              onChange={(e) => {
                setPage((draft) => {
                  draft.pageSize = Number(e.target.value);
                  return draft;
                });
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table {...getTableProps()} className="table table-hover">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          {preGlobalFilteredRows.length > 0 && globalFilteredRows.length > 0 ? (
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>No records found</tbody>
          )}
        </table>
      </div>

      <div className="pagination justify-content-between align-items-center">
        <div className="justify-self-start">
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                onClick={() =>
                  setPage((draft) => {
                    draft.pageIndex = 1;
                    return draft;
                  })
                }
                disabled={hasPrevious === false}
              >
                {"<<"}
              </Button>
              <Button
                onClick={() =>
                  setPage((draft) => {
                    draft.pageIndex = draft.pageIndex - 1;
                    return draft;
                  })
                }
                disabled={hasPrevious === false}
              >
                {"<"}
              </Button>
              <Button
                onClick={() =>
                  setPage((draft) => {
                    draft.pageIndex = draft.pageIndex + 1;
                    return draft;
                  })
                }
                disabled={hasNext === false}
              >
                {">"}
              </Button>
              <Button
                onClick={() =>
                  setPage((draft) => {
                    draft.pageIndex = controlledPageCount - 1;
                    return draft;
                  })
                }
                disabled={hasNext === false}
              >
                {">>"}
              </Button>
              {/* <div className="ms-3">
                <span className="me-2">
                  Page
                  <strong>
                    {controlledpageNo} of {pageOptions.length}
                  </strong>
                </span>
                <span>
                  | Go to page:{" "}
                  <input
                    type="number"
                    min={1}
                    max={pageOptions.length}
                    defaultValue={controlledpageNo + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) : 0;
                      setPage((draft) => {
                        draft.pageIndex = page;
                        return draft;
                      });
                    }}
                    style={{ width: "100px" }}
                  />
                </span>
              </div> */}
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    </>
  );
};
