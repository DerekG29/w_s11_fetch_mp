import React, { useEffect} from 'react'

export default function DogsList(props) {
  const { fetchDogs, dogs } = props;

  useEffect(() => {
    fetchDogs();
  }, []);

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
                <button>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
