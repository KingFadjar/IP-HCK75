const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { use } = require("../routes/authRoutes");

// Pastikan JWT_SECRET didefinisikan di .env file atau gunakan default
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';


// Fungsi Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash password menggunakan bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (dengan role default 'user' jika tidak diberikan)
    const user = await User.create({
      username,
      email,
      password: password,
      role: role || "user", // Default role adalah 'user', admin bisa di-set manual
      blacklisted: false, // User baru tidak dalam status blacklist
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    // Cek apakah user ada atau blacklisted
    if (!user || user.blacklisted) {
      return res.status(404).json({
        message: "Invalid credentials or user is blacklisted",
      });
    }

    
    // Cek apakah password yang diberikan valid
    // console.log(user.password, "========");
    // console.log(password, "========");
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // console.log(isPasswordValid, "========");
      
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Jika login berhasil, buat JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Payload: id dan role user
      jwtSecret, // Gunakan secret key dari .env
      { expiresIn: "1d" } // Token berlaku 1 hari
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        token,
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan data profile user
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Dapatkan user berdasarkan ID
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "role", "blacklisted"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk blacklist user (khusus admin)
exports.blacklistUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Cek apakah user yang melakukan request adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Cari user berdasarkan userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Blacklist user
    user.blacklisted = true;
    await user.save();

    res.status(200).json({ message: "User has been blacklisted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus user (khusus admin)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Cek apakah user yang melakukan request adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Cari dan hapus user
    const result = await User.destroy({ where: { id: userId } });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
