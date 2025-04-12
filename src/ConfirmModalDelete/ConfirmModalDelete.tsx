interface ConfirmModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModalDelete: React.FC<ConfirmModalDeleteProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <p className="mb-4 text-gray-800 text-lg">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 transition-all duration-500 ease-in-out hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-400 text-white transition-all duration-500 ease-in-out rounded-lg hover:bg-indigo-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalDelete;
