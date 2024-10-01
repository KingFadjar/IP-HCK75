const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Fungsi untuk melihat semua user (hanya bisa diakses oleh admin)
exports.getAllUsers = async (req, res) => {
  try {
    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view all users" });
    }

    // Dapatkan semua user
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk melihat profil user (bisa diakses oleh user itu sendiri)
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    // Cari user berdasarkan ID
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengupdate profil user (bisa diakses oleh user itu sendiri)
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, password } = req.body;

    // Cari user berdasarkan ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profil user
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus user (hanya bisa diakses oleh admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete users" });
    }

    // Hapus user
    const user = await User.destroy({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memblacklist atau unblacklist user (hanya bisa diakses oleh admin)
exports.toggleBlacklistUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can blacklist/unblacklist users" });
    }

    // Cari user berdasarkan ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle status blacklist
    user.blacklisted = !user.blacklisted;
    await user.save();

    const status = user.blacklisted ? "blacklisted" : "unblacklisted";
    res.status(200).json({ message: `User has been ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
