const OperationPanel = () => {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center gap-8 flex-1">
        <div className="text-sm px-3 py-2 bg-indigo-300 rounded-lg">
          Actioned (__)
        </div>
        <div className="text-sm px-3 py-2 bg-indigo-300 rounded-lg">Add</div>
        <div className="text-sm px-3 py-2 bg-indigo-300 rounded-lg">Delete</div>
        <div className="text-sm px-3 py-2 bg-indigo-300 rounded-lg">
          Preview Quotes
        </div>
      </div>
      
      <div className="flex items-center gap-8 flex-1 justify-end">
        <img src="search.svg" alt="search" />
        <div className="flex items-center gap-2">
          <span>Show</span>
          <span>__</span>
          <img src="arrow-outlined.svg" alt="" />
        </div>
        <div>Print</div>
        <div>Export</div>
      </div>
    </div>
  );
};

export default OperationPanel;
