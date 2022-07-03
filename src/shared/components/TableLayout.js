import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { FormGroup, ButtonToolbar, ButtonGroup, Button } from "reactstrap";
import InputControl from "./InputControl";

export const TableLayout = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    globalFilteredRows,
    setGlobalFilter,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 50,
        sortBy: [{ id: "name", desc: false }],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-sm-2">
          <div className="">
            <select
              className="form-control"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
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
              {page.map((row) => {
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
              <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </Button>
              <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {"<"}
              </Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </Button>
              <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    </>
  );
};

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <FormGroup>
        <InputControl
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search ${count} records...`}
        />
      </FormGroup>
    </span>
  );
}
export default GlobalFilter;
