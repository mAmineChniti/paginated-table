"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function PaginatedTable() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchQuery]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: currentPage,
            _limit: 10,
            q: searchQuery,
          },
        },
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
    setIsLoading(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Body",
        accessor: "body",
      },
    ],
    [],
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
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
            {" "}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(-1)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              ⏪
            </button>{" "}
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
