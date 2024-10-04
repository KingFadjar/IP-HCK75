const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');

// Inisialisasi app Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());

// Rute
app.use('/api/auth', authRoutes); // Rute untuk otentikasi (register, login)
app.use('/api/cars', carRoutes);  // Rute untuk mobil (admin bisa menambah mobil, user bisa merental)
app.use('/api/users', userRoutes); // Rute untuk pengguna (admin bisa kelola user)

// Homepage atau route lainnya
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Rental Mobil Homepage');
});

// Handle rute yang tidak ditemukan
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Sinkronisasi dengan database dan menjalankan server
sequelize.sync({ force: false })  // force: true jika ingin me-reset tabel setiap kali server dijalankan
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
