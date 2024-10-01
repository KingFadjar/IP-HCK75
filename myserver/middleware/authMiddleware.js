const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Pastikan JWT_SECRET sudah di-set di environment variable
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware untuk memeriksa token dan otentikasi pengguna
const authenticateUser = async (req, res, next) => {
  try {
    // Periksa apakah token ada di header authorization
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access Denied. No token provided or invalid format.' });
    }

    // Ambil token dari header
    const token = authorizationHeader.split(' ')[1];

    // Verifikasi token
    const decoded = jwt.verify(token, jwtSecret);

    // Cari pengguna berdasarkan ID yang ada di token
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Periksa apakah pengguna diblacklist
    if (user.blacklisted) {
      return res.status(403).json({ message: 'Access denied. User is blacklisted.' });
    }

    // Simpan informasi pengguna ke request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

// Middleware untuk memastikan bahwa hanya admin yang memiliki akses
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Middleware untuk memastikan bahwa hanya user biasa yang dapat mengakses
const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied. Users only.' });
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
  authorizeUser,
};
