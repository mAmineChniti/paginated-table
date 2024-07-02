import React from "react";
import { useTable, useSortBy, type ColumnInstance, type Column, type HeaderGroup, type Row } from "react-table";

interface TableProps {
  columns: Column<object>[];
  data: object[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
        aria-label="Table of posts"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup: HeaderGroup<object>) => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100"
            >
              {headerGroup.headers.map((column: ColumnInstance<object>) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps()) as HeaderPropGetter<object>}
                  className="cursor-pointer select-none px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 hover:bg-gray-200"
                  aria-label={`${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "Sorted Descending"
                        : "Sorted Ascending"
                      : ""
                  }`}
                >
                  {column.render("Header")}
                  <span className="sr-only">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-200 bg-white"
        >
          {rows.map((row: Row<object>) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="hover:bg-gray-50"
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.getCellProps().key}
                    {...cell.getCellProps()}
                    className="whitespace-wrap px-6 py-4 text-sm text-gray-900"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
