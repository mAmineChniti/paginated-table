'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface TableProps {
  columns: ColumnDef<Post, keyof Post>[];
  data: Post[];
}

export default function Table({ columns, data }: TableProps) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="cursor-pointer border-b border-gray-300 px-4 py-2 text-left"
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                <span>
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-b border-gray-300 px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
