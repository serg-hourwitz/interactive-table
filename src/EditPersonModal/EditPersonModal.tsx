import React, { useEffect, useRef, useState } from 'react';

interface EditPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: any;
  onSave: (updatedPerson: any) => void;
}

const EditPersonModal: React.FC<EditPersonModalProps> = ({
  isOpen,
  onClose,
  person,
  onSave,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (person) {
      setFormData(person);
    }
  }, [person]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Edit Person</h2>

        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/_/g, ' ')}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPersonModal;
