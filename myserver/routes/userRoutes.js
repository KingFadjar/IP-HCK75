const express = require('express');
const { getUsers, getUserById, updateUser, blacklistUser, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint untuk homepage
router.get('/', (req, res) => {
  res.status(200).send('Welcome to the Rental Mobil Homepage');
});

// Endpoint untuk mendapatkan daftar semua pengguna (hanya bisa diakses oleh admin)
router.get('/users', authenticateUser, authorizeAdmin, getUsers);

// Endpoint untuk mendapatkan detail pengguna berdasarkan ID (hanya bisa diakses oleh admin)
router.get('/users/:id', authenticateUser, authorizeAdmin, getUserById);

// Endpoint untuk memperbarui informasi pengguna (admin bisa memperbarui semua pengguna, user bisa memperbarui dirinya sendiri)
router.put('/users/:id', authenticateUser, updateUser);

// Endpoint untuk mem-blacklist pengguna (hanya bisa diakses oleh admin)
router.put('/users/blacklist/:id', authenticateUser, authorizeAdmin, blacklistUser);

// Endpoint untuk menghapus pengguna (hanya bisa diakses oleh admin)
router.delete('/users/:id', authenticateUser, authorizeAdmin, deleteUser);

module.exports = router;
