import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPersonModal from '../AddPersonModal/AddPersonModal';
import EditPersonModal from '../EditPersonModal/EditPersonModal';
import SearchModal from '../SearchModal/SearchModal';
import SearchErrorModal from '../SearchErrorModal/SearchErrorModal';
import ConfirmModalDelete from '../ConfirmModalDelete/ConfirmModalDelete';
import Pagination from '../Pagination/Pagination';
import OperationPanel from '../OperationPanel/OperationPanel';

const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<any | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<any[] | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  // Пагінація
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const fetchAllPeople = async () => {
    let allPeople: any[] = [];
    let url = 'https://swapi.dev/api/people/';

    while (url) {
      const response = await axios.get(url);
      allPeople = [...allPeople, ...response.data.results];
      url = response.data.next;
    }

    return allPeople;
  };

  useEffect(() => {
    // Fetch data from API
    const loadPeople = async () => {
      const data = await fetchAllPeople();
      setPeople(data);
    };

    loadPeople();
  }, []);

  // Функція для зміни сторінки
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Функція для зміни кількості елементів на сторінці
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handleDeleteSelected = () => {
    setConfirmModalOpen(true);
  };

  const confirmDeletion = () => {
    const updatedPeople = people.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setPeople(updatedPeople);
    setSelectedRows([]);
    setConfirmModalOpen(false);
  };

  const handleSavePerson = (updatedPerson: any) => {
    const updatedPeople = people.map((p) =>
      p === currentPerson ? updatedPerson : p
    );
    setPeople(updatedPeople);
  };

  const handleRowSelect = (index: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((id) => id !== index)
        : [...prevSelectedRows, index]
    );
  };

  const handleAddPerson = (person: any) => {
    setPeople([...people, person]);
  };

  const handleSearch = (filters: Record<string, string>) => {
    const filtered = people.filter((person) =>
      Object.entries(filters).every(([key, value]) =>
        person[key]?.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (filtered.length === 0) {
      setErrorModalOpen(true);
    } else {
      setFilteredPeople(filtered);
      setCurrentPage(1);
    }
  };

  // Розрахунок індексів для пагінації
  const visiblePeople = filteredPeople ?? people;
  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
  const currentPeople = visiblePeople.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );

  return (
    <>
      <OperationPanel
        selectedRowsCount={selectedRows.length}
        onAddClick={() => setAddModalOpen(true)}
        onDeleteClick={handleDeleteSelected}
        onSearchClick={() => setSearchModalOpen(true)}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse mb-6 lg:mb-0">
          <thead>
            <tr className="border-b text-left text-base">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === people.length && people.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIndices = people.map((_, index) => index);
                      setSelectedRows(allIndices);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-2">
                <img src="public/number.svg" alt="number" />
              </th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Height</th>
              <th className="px-4 py-2 font-medium">Mass</th>
              <th className="px-4 py-2 font-medium">Hair Color</th>
              <th className="px-4 py-2 font-medium">Skin Color</th>
              <th className="px-4 py-2 font-medium">Eye Color</th>
              <th className="px-4 py-2 font-medium">Birth Year</th>
              <th className="px-4 py-2 font-medium">Gender</th>
              <th className="px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {currentPeople.map((person, index) => {
              const globalIndex = indexOfFirstPerson + index; // для глобальної нумерації
              const isEvenRow = globalIndex % 2 === 0;

              return (
                <tr
                  key={globalIndex}
                  className={`border-b cursor-pointer ${
                    isEvenRow ? '' : 'bg-gray-200'
                  }`}
                  onClick={() => {
                    setCurrentPerson(person);
                    setEditModalOpen(true);
                  }}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(globalIndex)}
                      onChange={() => handleRowSelect(globalIndex)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold text-sm md:text-xl font-secondary">
                    {globalIndex + 1}.
                  </td>
                  <td className="px-4 py-2 text-xs">{person.name}</td>
                  <td className="px-4 py-2 text-xs">{person.height}</td>
                  <td className="px-4 py-2 text-xs">{person.mass}</td>
                  <td className="px-4 py-2 text-xs">{person.hair_color}</td>
                  <td className="px-4 py-2 text-xs">{person.skin_color}</td>
                  <td className="px-4 py-2 text-xs">{person.eye_color}</td>
                  <td className="px-4 py-2 text-xs">{person.birth_year}</td>
                  <td className="px-4 py-2 text-xs">{person.gender}</td>
                  <td className="px-4 py-2 text-xs">
                    <img src="solar_pen-linear.svg" alt="edit" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModalDelete
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDeletion}
        message="Are you sure you want to delete the selected items?"
      />

      <SearchErrorModal
        isOpen={isErrorModalOpen}
        onRetry={() => {
          setErrorModalOpen(false);
          setSearchModalOpen(true);
        }}
        onCancel={() => {
          setErrorModalOpen(false);
          setSearchModalOpen(false);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={visiblePeople.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {isAddModalOpen && (
        <AddPersonModal
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddPerson}
        />
      )}
      {isEditModalOpen && currentPerson && (
        <EditPersonModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          person={currentPerson}
          onSave={handleSavePerson}
        />
      )}
      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default PeopleTable;
