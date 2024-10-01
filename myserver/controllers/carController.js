const { Car } = require('../models');

// Fungsi untuk mendapatkan semua mobil (semua user bisa melihat)
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menambah mobil (hanya bisa dilakukan oleh admin)
exports.addCar = async (req, res) => {
  try {
    const { name, brand, type, price_per_day, available } = req.body;

    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add cars" });
    }

    // Buat mobil baru
    const car = await Car.create({
      name,
      brand,
      type,
      price_per_day,
      available: available !== undefined ? available : true,
    });

    res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk melihat detail mobil (semua user bisa melihat)
exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengupdate informasi mobil (hanya bisa dilakukan oleh admin)
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, type, price_per_day, available } = req.body;

    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update cars" });
    }

    // Cari mobil berdasarkan ID
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update informasi mobil
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.type = type || car.type;
    car.price_per_day = price_per_day || car.price_per_day;
    car.available = available !== undefined ? available : car.available;

    await car.save();

    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus mobil (hanya bisa dilakukan oleh admin)
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah user yang login adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete cars" });
    }

    // Cari dan hapus mobil
    const car = await Car.destroy({ where: { id } });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menyewa mobil (user biasa)
exports.rentCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { duration, withDriver } = req.body;

    // Cari mobil berdasarkan ID
    const car = await Car.findByPk(carId);

    if (!car || !car.available) {
      return res.status(404).json({ message: "Car not available for rent" });
    }

    // Hitung total harga berdasarkan durasi dan opsi driver
    let totalPrice = car.price_per_day * duration;
    if (withDriver === true) {
      totalPrice += 150000 * duration; // Biaya tambahan untuk driver
    }

    // Update status mobil menjadi tidak tersedia
    car.available = false;
    await car.save();

    // Response
    res.status(200).json({
      message: `Car rented successfully for ${duration} days`,
      car: {
        id: car.id,
        name: car.name,
        brand: car.brand,
        price_per_day: car.price_per_day,
        duration,
        withDriver,
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ekspor semua fungsi
module.exports = {
  getCars, // Pastikan getCars didefinisikan dengan benar
  addCar,
  getCarById,
  updateCar,
  deleteCar,
  rentCar,
};
