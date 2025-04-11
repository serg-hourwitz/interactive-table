import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPersonModal from '../AddPersonModal/AddPersonModal';
import EditPersonModal from '../EditPersonModal/EditPersonModal';
import SearchModal from '../SearchModal/SearchModal';
import Pagination from '../Pagination/Pagination';
import OperationPanel from '../OperationPanel/OperationPanel';

const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<any | null>(null);

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

  const handleRowClick = (e: React.MouseEvent, person: any) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'input') {
      setCurrentPerson(person);
      setEditModalOpen(true);
    }
  };

  const handleSavePerson = (updatedPerson: any) => {
    const updatedPeople = people.map((p, i) =>
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

  const handleDeleteSelected = () => {
    if (window.confirm('Are you sure you want to delete selected items?')) {
      const updatedPeople = people.filter(
        (_, index) => !selectedRows.includes(index)
      );
      setPeople(updatedPeople);
      setSelectedRows([]);
    }
  };

  const handleSearch = (filters: any) => {
    // Filter logic to be added
  };

  // Розрахунок індексів для пагінації
  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

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
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Mass</th>
              <th className="px-4 py-2">Hair Color</th>
              <th className="px-4 py-2">Skin Color</th>
              <th className="px-4 py-2">Eye Color</th>
              <th className="px-4 py-2">Birth Year</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentPeople.map((person, index) => (
              <tr
                key={index}
                className="border-b"
                onClick={() => {
                  setCurrentPerson(person);
                  setEditModalOpen(true);
                }}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelect(index)}
                    onClick={(e) => e.stopPropagation()} // щоб не відкривав modal при кліку на чекбокс
                  />
                </td>
                <td className="px-4 py-2">{person.name}</td>
                <td className="px-4 py-2">{person.height}</td>
                <td className="px-4 py-2">{person.mass}</td>
                <td className="px-4 py-2">{person.hair_color}</td>
                <td className="px-4 py-2">{person.skin_color}</td>
                <td className="px-4 py-2">{person.eye_color}</td>
                <td className="px-4 py-2">{person.birth_year}</td>
                <td className="px-4 py-2">{person.gender}</td>
                <td className="px-4 py-2">
                  <img src="solar_pen-linear.svg" alt="edit" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={people.length}
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
