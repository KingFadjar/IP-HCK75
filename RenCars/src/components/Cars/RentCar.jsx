
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RentCar.css';

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [duration, setDuration] = useState(1);
  const [withDriver, setWithDriver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch available cars
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data.cars); // Assumes the response structure includes a cars array
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleRent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/cars/rent/${selectedCar}`, {
        duration,
        withDriver,
      });
      setMessage(`Car rented successfully! Total Price: ${response.data.totalPrice}`);
    } catch (error) {
      console.error('Renting car failed:', error);
      setMessage('Failed to rent car. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Rent a Car</h1>
      <form onSubmit={handleRent}>
        <div className="form-group">
          <label htmlFor="car">Select a Car</label>
          <select
            id="car"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            required
          >
            <option value="">-- Select a Car --</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name} - {car.brand} (${car.price_per_day}/day)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (days)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={withDriver}
              onChange={(e) => setWithDriver(e.target.checked)}
            />
            Rent with Driver
          </label>
        </div>
        <button type="submit">Rent Car</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RentCar;
