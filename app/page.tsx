'use client';
import React, { useState, useEffect } from 'react';
import PaginatedTable from '@/components/PaginatedTable';
import Graph from '@/components/Graph';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function HomePage() {
  const [showTable, setShowTable] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  const toggleComponent = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10&q=${debouncedSearchQuery}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = (await response.json()) as Post[];
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [currentPage, debouncedSearchQuery]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={toggleComponent}
          className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showTable ? 'Show Chart' : 'Show Table'}
        </button>
      </div>

      {showTable ? (
        <PaginatedTable
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        <Graph data={posts} />
      )}
    </div>
  );
}
