import React, { useState, useEffect } from 'react';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (person: any) => void;
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
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
  const [isValid, setIsValid] = useState(false);

  const validateField = (key: string, value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) return 'This field is required';

    if (['height', 'mass', 'birth_year'].includes(key)) {
      const numberValue = Number(trimmed);
      if (!Number.isFinite(numberValue)) return 'Must be a valid number';
      if (numberValue < 0) return 'Must be 0 or greater';
    }

    return '';
  };

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onAdd(formData); // ← виправлено
    onClose();
  };

  if (!isOpen) return null; // ← тепер isOpen має сенс

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-10">
      <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Add New Person</h2>

        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <input
              type={
                ['height', 'mass', 'birth_year'].includes(key)
                  ? 'number'
                  : 'text'
              }
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
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isValid
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-400 text-white cursor-not-allowed'
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
