import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CarList from './components/Cars/CarList';
import UserList from './components/Users/UserList';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar/Navbar';
import UserDetails from './components/Users/UserDetails';
import AddCar from './components/Cars/AddCar'; // Import AddCar
import CarDetails from './components/Cars/CarDetails'; // Import CarDetails



function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<> <Login /> </>} />
        <>
        <Route path="/api/auth/register" element={<> <Navbar /> <Register /> </>} />
        <Route path="/api/cars" element={<> <Navbar /> <CarList /> </>} />
        <Route path="/api/users" element={<UserList />} />
        <Route path="/api/cars/add" element={<AddCar />} />
        <Route path="/api/cars/:id" element={<CarDetails />} />
        <Route path="/api/users/:id" element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
        </>
        
      </Routes>
    </Router>
  );
}

export default App;
