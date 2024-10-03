const axios = require('axios');
const { Car } = require('../models');

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY; // Ambil kunci API dari environment variable

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

// Fungsi untuk mendapatkan rekomendasi harga mobil termurah
exports.getCheapestCarRecommendation = async (req, res) => {
  try {
    // Ambil semua mobil dari database
    const cars = await Car.findAll();

    // Jika tidak ada mobil, kirim respons
    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars available for rent." });
    }

    // Menyiapkan prompt untuk mengarahkan Gemini AI
    const carPrices = cars.map(car => `Model: ${car.name}, Price: ${car.price_per_day}`).join(", ");
    const prompt = `Dari daftar mobil berikut, rekomendasikan harga terendah untuk mobil sewa: ${carPrices}`;

    // Panggil API Google Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        prompt,
        maxTokens: 50, // Jumlah maksimum token yang ingin dihasilkan
      }
    );

    // Ambil hasil dari API
    const recommendation = response.data; // Sesuaikan dengan format respons API

    // Pastikan response dalam bentuk JSON
    res.status(200).json({
      message: "Cheapest car recommendation generated successfully.",
      recommendation: recommendation // Format rekomendasi yang diterima dari API
    });

  } catch (error) {
    console.error('Error fetching cheapest car recommendation:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
