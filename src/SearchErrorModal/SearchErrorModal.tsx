
interface Props {
  isOpen: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

const SearchErrorModal: React.FC<Props> = ({ isOpen, onRetry, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Oops! Failure:((</h2>
        <p className="mb-6">
          No one was found according to the specified parameters. Please try
          again.
          <br />
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-indigo-300 text-black rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out hover:text-white"
          >
            Retry
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchErrorModal;
