import React, { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

const ENDPOINT = 'http://localhost:3003/api/dogs';

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([])

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
  
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList fetchDogs={fetchDogs} dogs={dogs} />} />
        <Route path="/form" element={<DogForm fetchBreeds={fetchBreeds} breeds={breeds} />} />
      </Routes>
    </div>
  )
}
