import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm(props) {
  const {
    fetchBreeds,
    breeds,
    editing,
    dog,
    createDog,
    updateDog,
    setEditing
  } = props;

  const [values, setValues] = useState(initialForm);
  const navigate = useNavigate()

  useEffect(() => {
    fetchBreeds();
    if (editing) {
      const { name, breed, adopted } = dog;
      setValues({ name, breed, adopted })
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      updateDog(dog.id, { ...values });
      setEditing(false);
    } else {
      createDog({ ...values });
    }
    navigate('/');
  }
  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    });
  }

  return (
    <div>
      <h2>
        {editing ? 'Update Dog' : 'Create Dog'}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {breeds?.map((breed, idx)=> {
            return (
              <option key={idx} value={breed}>{breed}</option>
            )
          })}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {editing ? 'Update Dog' : 'Create Dog'}
          </button>
          <button aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  )
}
