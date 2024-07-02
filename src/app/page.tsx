"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginatedTable from "@/components/PaginatedTable";
import Graph from "@/components/Graph";

export default function HomePage() {
  const [showTable, setShowTable] = useState(true);

  const toggleComponent = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      setPosts(response.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={toggleComponent}
          className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showTable ? "Show Chart" : "Show Table"}
        </button>
      </div>

      {showTable ? <PaginatedTable /> : <Graph data={posts} />}
    </div>
  );
}
