import React, { useState } from 'react';

interface AddPersonModalProps {
  onClose: () => void;
  onSave: (person: any) => void;
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
  });

  const isValid =
    formData.name.trim() !== '' && formData.birth_year.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Add New Person</h2>
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key.replace('_', ' ')}
            className="w-full border p-2 rounded"
          />
        ))}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              isValid
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;
