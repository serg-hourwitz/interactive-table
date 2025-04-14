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
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<any | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<any[] | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Fetch data and load from localStorage or API
  const fetchAllPeople = async () => {
    let allPeople: any[] = [];
    let url = 'https://swapi.py4e.com/api/people/';
    while (url) {
      const response = await axios.get(url);
      allPeople = [...allPeople, ...response.data.results];
      url = response.data.next;
    }
    return allPeople;
  };

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      const storedPeople = localStorage.getItem('people');
      if (storedPeople) {
        setPeople(JSON.parse(storedPeople));
        setIsLoading(false);
        return;
      }
      const data = await fetchAllPeople();
      setPeople(data);
      setIsLoading(false);
    };
    loadPeople();
  }, []);

  // Sync people state with localStorage on changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('people', JSON.stringify(people));
    }
  }, [people, isLoading]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
  };

  // Handle delete selected people
  const handleDeleteSelected = () => {
    setConfirmModalOpen(true);
  };

  // Confirm deletion of selected people
  const confirmDeletion = () => {
    const updatedPeople = people.filter(
      (person) => !selectedNames.includes(person.name)
    );
    localStorage.setItem('people', JSON.stringify(updatedPeople));
    setPeople(updatedPeople);
    setFilteredPeople(null);
    setSelectedNames([]);
    setConfirmModalOpen(false);
  };


  // Save edited person
  const handleSavePerson = (updatedPerson: any) => {
    const updatedPeople = people.map((p) =>
      p.name === currentPerson.name ? updatedPerson : p
    );
    setPeople(updatedPeople); // Update the people state
    setFilteredPeople(null);
  };

  // Add new person
  const handleAddPerson = (person: any) => {
    const updatedPeople = [...people, person];
    setPeople(updatedPeople); // Update the people state
    setFilteredPeople(null);
  };

  // Search for people based on filters
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

  const handleRowSelect = (name: string) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(
        selectedNames.filter((selectedName) => selectedName !== name)
      );
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleRetry = () => {
    setErrorModalOpen(false); // Закриваємо помилку
    setSearchModalOpen(true); // Відкриваємо знову модалку пошуку
  };



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
        selectedRowsCount={selectedNames.length}
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
                    selectedNames.length === people.length && people.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allNames = people.map((p) => p.name);
                      setSelectedNames(allNames);
                    } else {
                      setSelectedNames([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-2">
                <img src="number.svg" alt="number" />
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
            {isLoading ? (
              <tr>
                <td colSpan={11} className="text-left md:text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : currentPeople.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              currentPeople.map((person, index) => {
                const globalIndex = indexOfFirstPerson + index;
                const isEvenRow = globalIndex % 2 === 0;

                return (
                  <tr
                    key={person.name}
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
                        checked={selectedNames.includes(person.name)}
                        onChange={() => handleRowSelect(person.name)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-2 font-semibold text-sm md:text-xl font-secondary">
                      {globalIndex + 1}.
                    </td>
                    <td className="px-4 py-2 text-sm">{person.name}</td>
                    <td className="px-4 py-2 text-sm">{person.height}</td>
                    <td className="px-4 py-2 text-sm">{person.mass}</td>
                    <td className="px-4 py-2 text-sm">{person.hair_color}</td>
                    <td className="px-4 py-2 text-sm">{person.skin_color}</td>
                    <td className="px-4 py-2 text-sm">{person.eye_color}</td>
                    <td className="px-4 py-2 text-sm">{person.birth_year}</td>
                    <td className="px-4 py-2 text-sm">{person.gender}</td>
                    <td><img src="solar_pen-linear.svg" alt="pen" /></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={visiblePeople.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPerson}
      />

      <EditPersonModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSavePerson}
        person={currentPerson}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={handleSearch}
      />

      <SearchErrorModal
        isOpen={isErrorModalOpen}
        onRetry={handleRetry} // Функція, яка повторює пошук або відкриває SearchModal
        onCancel={() => setErrorModalOpen(false)} // Просто закриває модалку
      />

      <ConfirmModalDelete
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDeletion}
        message="Are you sure you want to delete the selected items?"
      />
    </>
  );
};

export default PeopleTable;
