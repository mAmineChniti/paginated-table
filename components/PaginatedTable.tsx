'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from './Table';
import { type ColumnDef } from '@tanstack/react-table';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PaginatedTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: {
            _page: currentPage,
            _limit: 10,
            q: searchQuery,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
    setIsLoading(false);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const fetchPostsData = async () => {
      await fetchPosts();
    };
    fetchPostsData();
  }, [currentPage, searchQuery, fetchPosts]);

  const columns = React.useMemo<ColumnDef<Post, keyof Post>[]>(
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
        className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <Table columns={columns} data={posts} />
          <div className="mt-4 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(-1)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              ⏪
            </button>
            <button
              disabled={posts.length < 10}
              onClick={() => handlePageChange(1)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              ⏩
            </button>
          </div>
        </>
      )}
    </div>
  );
}
