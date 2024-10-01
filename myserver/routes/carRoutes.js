const express = require('express');
const { getCars, addCar, updateCar, deleteCar, rentCar } = require('../controllers/carController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint untuk mendapatkan daftar semua mobil (bisa diakses oleh semua user)
router.get('/', authenticateUser, getCars);

// Endpoint untuk menambah mobil (hanya bisa diakses oleh admin)
router.post('/add', authenticateUser, authorizeAdmin, addCar);

// Endpoint untuk memperbarui mobil berdasarkan ID (hanya bisa diakses oleh admin)
router.put('/update/:id', authenticateUser, authorizeAdmin, updateCar);

// Endpoint untuk menghapus mobil berdasarkan ID (hanya bisa diakses oleh admin)
router.delete('/delete/:id', authenticateUser, authorizeAdmin, deleteCar);

// Endpoint untuk menyewa mobil (hanya bisa diakses oleh user biasa)
router.post('/rent/:id', authenticateUser, rentCar);

module.exports = router;
