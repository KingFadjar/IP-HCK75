import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
 // Tambahkan CSS jika perlu

// Set ikon untuk marker
const markerIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', // Ganti dengan URL ikon yang diinginkan
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  shadowSize: [50, 64],
  shadowAnchor: [4, 62]
});

const MapComponent = () => {
  const position = [-6.200000, 106.816666]; // Ganti dengan koordinat lokasi rental mobil

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>
          Rental Mobil Mr. King<br /> Klik untuk info lebih lanjut!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
