import { useMemo } from 'react';

export function usePagination(data = [], currentPage=1, itemsPerPage = 20) {
  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data, itemsPerPage]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, data, itemsPerPage]);

  return { totalPages, paginatedData };
}