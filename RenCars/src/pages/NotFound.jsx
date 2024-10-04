// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Halaman Tidak Ditemukan</h1>
      <p style={styles.description}>
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link to="/" style={styles.link}>
        Kembali ke Beranda
      </Link>
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
  link: {
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

export default NotFound;
