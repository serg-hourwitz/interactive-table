import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 10;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    const visiblePages = Math.min(totalPages, maxVisiblePages);

    for (let i = 1; i <= visiblePages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 text-black ${
            currentPage === i ? 'text-xl font-semibold' : 'text-base'
          }`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > maxVisiblePages) {
      pageButtons.push(
        <span key="dots" className="mx-2">
          ...
        </span>,
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 ${
            currentPage === totalPages ? 'bg-indigo-500 text-white' : 'bg-white'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2"
      >
        <img src="public/arrow-prev.svg" alt="arrow" />
      </button>

      {renderPageButtons()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2"
      >
        <img src="public/arrow-next.svg" alt="arrow" />
      </button>
    </div>
  );
};

export default Pagination;
