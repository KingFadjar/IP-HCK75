import React, { useState } from 'react';
import axios from 'axios';
import './AddCar.css'; // Import CSS

const AddCar = () => {
  const [carDetails, setCarDetails] = useState({
    name: '',
    brand: '',
    type: '',
    price_per_day: '',
    available: true,
    imageSrc: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cars/add', carDetails);
      setSuccess(true);
      setCarDetails({
        name: '',
        brand: '',
        type: '',
        price_per_day: '',
        available: true,
        imageSrc: ''
      });
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={carDetails.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input type="text" name="brand" value={carDetails.brand} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input type="text" name="type" value={carDetails.type} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price per Day</label>
          <input type="number" name="price_per_day" value={carDetails.price_per_day} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Available</label>
          <input type="checkbox" name="available" checked={carDetails.available} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Image Source</label>
          <input type="text" name="imageSrc" value={carDetails.imageSrc} onChange={handleChange} required />
        </div>
        <button type="submit">Add Car</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Car added successfully!</p>}
    </div>
  );
};

export default AddCar;
