import { useState, useEffect } from 'react';
import axios from 'axios';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Функція для отримання даних з API
    const fetchPeople = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people');
        setPeople(response.data.results); // Зберігаємо результат в state
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
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
          {people.map((person, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <input type="checkbox" />
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
                <img src="solar_pen-linear.svg" alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
