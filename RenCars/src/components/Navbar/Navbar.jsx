// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Pastikan untuk menambahkan styling terpisah jika diperlukan


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Mr. King Car Rental</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/api/users">user</Link>
          </li>
          <li>
            <Link to="/api/cars/add">Add Cars</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
