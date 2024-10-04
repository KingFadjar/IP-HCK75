import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useSelector } from 'react-redux';
import imageUrl from '../../../public/assets/avanza.jpeg';
import './CarList.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Impor Leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Set ikon untuk marker
const markerIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  shadowSize: [50, 64],
  shadowAnchor: [4, 62]
});

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 3;
  const [selectedCar, setSelectedCar] = useState(null); // State untuk mobil yang dipilih
  const userStore = useSelector(state => state);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get('http://localhost:3001/api/cars', {
        headers: {
          Authorization: 'Bearer ' + userStore.auth.user.token
        }
      });
      setCars(response.data.cars);
    };
    fetchCars();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.filter(car => !car.isDeleted).slice(indexOfFirstCar, indexOfLastCar); // Filter untuk mengabaikan mobil yang dihapus

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fungsi untuk menangani penghapusan mobil
  const handleDelete = (carId) => {
    // Menandai mobil sebagai dihapus tanpa mengubah database
    setCars(cars.map(car => 
      car.id === carId ? { ...car, isDeleted: true } : car
    ));
  };

  return (
    <div>
      <h1>Available Cars</h1>
      <div className="car-list">
        {currentCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={imageUrl} alt={car.name} />
            <h2>{car.name}</h2>
            <p>Brand: {car.brand}</p>
            <p>Type: {car.type}</p>
            <p>Price per day: {car.price_per_day}</p>
            <button onClick={() => setSelectedCar(car)}>Detail</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button> {/* Tombol Delete */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      {selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedCar(null)}>&times;</span>
            <h2>Car Details</h2>
            <p><strong>Name:</strong> {selectedCar.name}</p>
            <p><strong>Brand:</strong> {selectedCar.brand}</p>
            <p><strong>Type:</strong> {selectedCar.type}</p>
            <p><strong>Price per day:</strong> {selectedCar.price_per_day}</p>
            <p><strong>Available:</strong> {selectedCar.available ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
      
      {/* Menampilkan peta dan ikon WhatsApp */}
      <div className="map-container">
        <MapContainer center={[-6.200000, 106.816666]} zoom={13} scrollWheelZoom={false} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[-6.200000, 106.816666]} icon={markerIcon}>
            <Popup>
              Rental Mobil Mr. King<br /> Klik untuk info lebih lanjut!
            </Popup>
          </Marker>
        </MapContainer>
        <a href="https://wa.me/6282388237915" target="_blank" rel="noopener noreferrer">
          <img src="/Rencars/public/assets/whatsapp.png" alt="WhatsApp" className="whatsapp-icon" />
        </a>
      </div>
    </div>
  );
};

export default CarList;
