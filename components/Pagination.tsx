'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (totalPages <= 1) return null;

  if (!mounted) {
    return <div className="h-12"></div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getPageUrl = (page: number) => {
    const baseWithoutPage = baseUrl.replace(/[?&]page=\d+/, '');
    const finalBase = baseWithoutPage || baseUrl;
    return `${finalBase}${finalBase.includes('?') ? '&' : '?'}page=${page}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Previous
        </Link>
      )}

      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={getPageUrl(pageNumber)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === pageNumber
              ? 'bg-yellow-600 text-white font-bold'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}