import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: Record<string, string>) => void;
}
const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  if (!isOpen) return null;
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSearch(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Search Filter</h2>
        {[
          'name',
          'height',
          'mass',
          'hair_color',
          'skin_color',
          'eye_color',
          'birth_year',
          'gender',
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={filters[field] || ''}
            onChange={handleChange}
            placeholder={field.replace('_', ' ')}
            className="w-full border p-2 rounded"
          />
        ))}

        <div className="flex justify-end gap-4">
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded"
            onClick={() => {
              setFilters({});
              onSearch({});
            }}
          >
            Clear
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
