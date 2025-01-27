'use client';
import React, { useMemo } from 'react';
import Table from './Table';
import { type ColumnDef } from '@tanstack/react-table';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PaginatedTableProps {
  posts: Post[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  posts,
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
}) => {
  const columns = useMemo<ColumnDef<Post, keyof Post>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'body',
        header: 'Body',
      },
    ],
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: number) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="container mx-auto rounded-lg bg-white p-4 shadow-lg">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
      />
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <Table columns={columns} data={posts} />
          <div className="mt-4 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(-1)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              ⏪
            </button>
            <button
              disabled={posts.length < 10}
              onClick={() => handlePageChange(1)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              ⏩
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedTable;
