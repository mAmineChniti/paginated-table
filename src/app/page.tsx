'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PaginatedTable from '@/components/PaginatedTable';
import Graph from '@/components/Graph';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function HomePage() {
  const [showTable, setShowTable] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const toggleComponent = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts'
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error as needed
      }
    };

    fetchPosts().catch((error) => {
      console.error('Error in fetchPosts:', error);
      // Handle error as needed
    });
  }, []); // Empty dependency array means this effect runs once on mount

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

      {showTable ? <PaginatedTable /> : <Graph data={posts} />}
    </div>
  );
}
