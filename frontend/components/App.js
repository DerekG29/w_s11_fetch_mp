import React, { useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

const ENDPOINT = 'http://localhost:3003/api/dogs';

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [editing, setEditing] = useState(false);
  const [dog, setDog] = useState(null);
  const navigate = useNavigate();

  const fetchDogs = async () => {
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) {
        throw new Error('There was an issue fetching dogs...');
      }
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchBreeds = async () => {
    try {
      const res = await fetch(`${ENDPOINT}/breeds`);
      if (!res.ok) {
        throw new Error('There was an issue fetching breeds...');
      }
      const data = await res.json();
      setBreeds(data)
    } catch (error) {
      console.error(error);
    }
  }
  const deleteDog = async (id) => {
    try {
      const res = await fetch(`${ENDPOINT}/${id}`, {
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
  const editDog = async (id) => {
    setDog(dogs?.find(dog => dog.id === id));
    setEditing(true);
    navigate('/form');
  }
  const createDog = async (payload) => {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      if (!res.ok) {
        throw new Error('There was an issue creating a new dog...')
      }
    } catch (error) {
      console.error(error);
    }
  }
  const updateDog = async (id, payload) => {
    try {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      if (!res.ok) {
        throw new Error('There was an issue updating the dog...');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
            fetchDogs={fetchDogs}
            dogs={dogs}
            deleteDog={deleteDog}
            editDog={editDog}
          />}
        />
        <Route path="/form" element={<DogForm
            fetchBreeds={fetchBreeds}
            breeds={breeds}
            editing={editing}
            dog={dog}
            createDog={createDog}
            updateDog={updateDog}
            setEditing={setEditing}
          />}
        />
      </Routes>
    </div>
  )
}
