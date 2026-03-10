"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  initialQuery?: string;
  initialSort?: string;
  initialTime?: string;
}

const Search = ({
  initialQuery = "",
  initialSort = "publishedAt",
  initialTime = "all",
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);
  const [timeFilter, setTimeFilter] = useState(initialTime);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Build URL with all filters
      const params = new URLSearchParams({
        q: searchTerm.trim(),
        sort: sortBy,
        time: timeFilter,
      });

      router.push(`/search?${params.toString()}`);
    }
  };

  if (!mounted) {
    return (
      <div className="my-6">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 h-12"></div>
            <div className="px-6 py-2 bg-yellow-600 text-white rounded-lg h-12 w-24"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-gray-100 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 flex justify-between gap-8"
      >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for news articles..."
            className="flex-1 px-4 mb-0 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex flex-wrap gap-4 mb-0">
            {/* Sort by */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700"
              >
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="publishedAt">Most Recent</option>
                <option value="relevancy">Most Relevant</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="time"
                className="text-sm font-medium text-gray-700"
              >
                From:
              </label>
              <select
                id="time"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
                <option value="14days">Last 14 days</option>
                <option value="month">Last month</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Search
          </button>
      </form>
    </div>
  );
};

export default Search;
