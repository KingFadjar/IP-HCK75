const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint untuk registrasi pengguna (user dan admin)
router.post('/register', register);

// Endpoint untuk login pengguna (user dan admin)
router.post('/login', login);

// Contoh endpoint yang hanya bisa diakses oleh admin
router.get('/admin', authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome Admin, you have access!' });
});

// Contoh endpoint yang hanya bisa diakses oleh user (biasa)
router.get('/user', authenticateUser, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.username}, you have access!` });
});

module.exports = router;
