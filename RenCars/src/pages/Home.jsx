// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Selamat Datang di Mr. King Car Rental 213</h1>
      <p style={styles.description}>
        Temukan mobil impian Anda untuk disewa dengan harga terbaik. Kami menyediakan berbagai jenis mobil untuk kebutuhan Anda.
      </p>
      <div style={styles.buttonContainer}>
        <Link to="/api/auth/login" style={styles.button}>
          Login
        </Link>
        <Link to="/api/auth/register" style={styles.button}>
          Register
        </Link>
        <Link to="/api/cars" style={styles.button}>
          Lihat Mobil
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0f172a', // Warna latar belakang gelap
    color: '#ffffff',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#38bdf8', // Warna tombol
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default Home;
