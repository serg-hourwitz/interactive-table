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
    const half = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - half, 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // Якщо треба, додаємо кнопку на першу сторінку і "..."
    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mx-1 transition-all duration-300 ease-in-out ${
            currentPage === 1 ? 'md:text-xl font-semibold' : ''
          }`}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageButtons.push(
          <span key="start-dots" className="mx-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 text-black transition-all duration-300 ease-in-out ${
            currentPage === i ? 'md:text-xl font-semibold' : 'md:text-base'
          }`}
        >
          {i}
        </button>
      );
    }

    // Якщо треба, додаємо "..." і останню сторінку
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="end-dots" className="mx-2">
            ...
          </span>
        );
      }

      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 ${
            currentPage === totalPages
              ? 'md:text-xl font-semibold'
              : 'md:text-base'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };


  return (
    <div className="flex flex-wrap justify-center items-center mt-4 mb-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2  transition-all duration-300 ease-in-out"
      >
        <img src="arrow-prev.svg" alt="arrow" />
      </button>

      {renderPageButtons()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 transition-all duration-300 ease-in-out"
      >
        <img src="arrow-next.svg" alt="arrow" />
      </button>
    </div>
  );
};

export default Pagination;
