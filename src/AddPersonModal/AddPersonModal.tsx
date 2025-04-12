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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      const trimmed = value.trim();

      if (!trimmed) {
        newErrors[key] = 'This field is required';
      } else if (key === 'height' || key === 'mass' || key === 'birth_year') {
        const numberValue = Number(trimmed);
        if (!Number.isFinite(numberValue)) {
          newErrors[key] = 'Must be a valid number';
        } else if (numberValue < 0) {
          newErrors[key] = 'Must be 0 or greater';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' })); // clear error
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-10">
      <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Add New Person</h2>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <input
              type={key === 'height' || key === 'mass' || key === 'birth_year' ? 'number' : 'text'}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.replace('_', ' ')}
              className={`w-full border p-2 rounded ${
                errors[key] ? 'border-red-500' : ''
              }`}
            />
            {errors[key] && (
              <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              Object.keys(errors).length === 0
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;
