// src/components/Cars/CarDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CarDetails.css'; // Import CSS

const CarDetails = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data.car); // Mengatur state car dengan data yang diterima
      } catch (error) {
        setError('Failed to fetch car details');
      }
    };

    fetchCarDetails();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>; // Tampilkan loading saat data di-fetch
  }

  return (
    <div className="car-details-container">
      <h2>Car Details</h2>
      <div className="car-details">
        <img src={car.imageSrc} alt={car.name} className="car-image" />
        <h3>{car.name}</h3>
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Type:</strong> {car.type}</p>
        <p><strong>Price per Day:</strong> IDR {car.price_per_day}</p>
        <p><strong>Available:</strong> {car.available ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default CarDetails;
