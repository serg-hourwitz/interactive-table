import React from 'react';

interface OperationPanelProps {
  selectedRowsCount: number;
  onAddClick: () => void;
  onDeleteClick: () => void;
  onSearchClick: () => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
}

const OperationPanel: React.FC<OperationPanelProps> = ({
  selectedRowsCount,
  onAddClick,
  onDeleteClick,
  onSearchClick,
  onItemsPerPageChange,
  itemsPerPage,
}) => {
  return (
    <div className="flex flex-wrap items-center mb-6 mt-6 md:mt-0">
      <div className="flex flex-wrap items-center gap-8 flex-1">
        <div
          className={`text-sm px-3 py-2 rounded-lg ${
            selectedRowsCount > 0
              ? 'bg-indigo-500 text-white'
              : 'bg-indigo-300 text-black'
          } w-[120px]`}
        >
          Actioned ({selectedRowsCount})
        </div>

        <div
          className="text-sm px-3 py-2 bg-indigo-300 text-black rounded-lg cursor-pointer"
          onClick={onAddClick}
        >
          Add
        </div>

        <button
          className="text-sm px-3 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer disabled:bg-indigo-300 disabled:text-black disabled:cursor-not-allowed"
          onClick={onDeleteClick}
          disabled={selectedRowsCount === 0}
        >
          Delete
        </button>
        <div className="text-sm px-3 py-2 bg-indigo-300 rounded-lg">
          Preview Quotes
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8 flex-1 justify-end">
        <img
          className="cursor-pointer"
          src="search.svg"
          alt="search"
          onClick={onSearchClick}
        />
        <div className="flex items-center gap-2">
          <span>Show</span>
          <div className="relative w-16">
            <select
              className="w-full p-1 appearance-none bg-white border border-gray-300 rounded-md text-sm cursor-pointer border-none outline-none font-secondary"
              value={itemsPerPage}
              onChange={onItemsPerPageChange}
            >
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <img
              className="absolute top-1/2 right-2 w-4 h-3 pointer-events-none transform -translate-y-1/2"
              src="arrow-outlined.svg"
              alt=""
            />
          </div>
        </div>
        <div>Print</div>
        <div>Export</div>
      </div>
    </div>
  );
};

export default OperationPanel;
