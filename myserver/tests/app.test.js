// tests/app.test.js

const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Import rute yang telah dibuat
const authRoutes = require('../routes/authRoutes');
const carRoutes = require('../routes/carRoutes');
const userRoutes = require('../routes/userRoutes');

// Gunakan rute
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);

// Variabel untuk menyimpan token
let accessToken;
let adminToken;

// Test suite
describe('Rental Mobil API', () => {

  // Test untuk registrasi
  test('POST /api/auth/register - harus berhasil mendaftar pengguna baru', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'user1',
        email: 'user1@example.com',
        password: 'user123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  // Test untuk login
  test('POST /api/auth/login - harus berhasil login dan mendapatkan token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user1@example.com',
        password: 'user123'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();

    // Simpan token ke variabel
    accessToken = response.body.token; // Token untuk user biasa
  });

  // Test untuk login admin
  test('POST /api/auth/login/admin - harus berhasil login admin dan mendapatkan token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com', // Pastikan admin sudah terdaftar
        password: 'admin123' // Pastikan password benar
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();

    // Simpan token ke variabel
    adminToken = response.body.token; // Token untuk admin
  });

  // Test untuk mendapatkan semua mobil
  test('GET /api/cars - harus mengembalikan daftar mobil', async () => {
    const response = await request(app)
      .get('/api/cars')
      .set('Authorization', `Bearer ${accessToken}`); // Gunakan token yang didapatkan

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cars');
  });

  // Test untuk menambah mobil (hanya untuk admin)
  test('POST /api/cars/add - hanya admin yang bisa menambah mobil', async () => {
    const response = await request(app)
      .post('/api/cars/add')
      .set('Authorization', `Bearer ${adminToken}`) // Gunakan token admin
      .send({
        name: 'Toyota Avanza',
        brand: 'Toyota',
        type: 'MPV',
        price_per_day: 350000
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Car added successfully');
  });

  // Test untuk menghapus mobil
  test('DELETE /api/cars/delete/:id - harus menghapus mobil dengan ID yang valid', async () => {
    const response = await request(app)
      .delete('/api/cars/delete/1') // Ganti 1 dengan ID mobil yang ingin dihapus
      .set('Authorization', `Bearer ${adminToken}`); // Gunakan token admin

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Car deleted successfully');
  });

  // Test untuk melihat profil user
  test('GET /api/users/profile - harus mengembalikan profil user', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${accessToken}`); // Gunakan token user biasa

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  // Test untuk menghapus user
  test('DELETE /api/users/:id - harus menghapus user dengan ID yang valid', async () => {
    const response = await request(app)
      .delete('/api/users/1') // Ganti 1 dengan ID user yang ingin dihapus
      .set('Authorization', `Bearer ${adminToken}`); // Gunakan token admin

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

});
