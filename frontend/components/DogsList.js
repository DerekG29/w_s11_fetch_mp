import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DogsList(props) {
  const { fetchDogs, dogs } = props;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDogs();
  }, []);

  const editDog = id => {

  }
  const deleteDog = async id => {
    try {
      const res = await fetch(`http://localhost:3003/api/dogs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('There was an issue deleting the dog...')
      }
      fetchDogs();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs?.map(dog => {
          return (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? 'adopted' : 'NOT adopted'}
              <div>
                <button>Edit</button>
                <button onClick={() => deleteDog(dog.id)}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
