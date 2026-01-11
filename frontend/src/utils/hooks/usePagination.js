import { useMemo, useState } from 'react';

export function usePagination(data = [], currentPage=1, itemsPerPage = 20) {
  const orderedData = useMemo(
    () => [...data].reverse(),
    [data]
  );

  const totalPages = useMemo(
    () => Math.ceil(orderedData.length / itemsPerPage),
    [orderedData, itemsPerPage]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orderedData.slice(start, end);
  }, [currentPage, orderedData, itemsPerPage]);

  return { totalPages, paginatedData };
}