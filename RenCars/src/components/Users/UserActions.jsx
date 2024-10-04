import React from 'react';
import axios from 'axios';

const UserActions = ({ userId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'), // Ganti dengan token yang sesuai
        },
      });
      alert('User deleted successfully');
      window.location.reload(); // Reload page to see updated list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleBlacklist = async () => {
    try {
      await axios.put(`http://localhost:3001/api/users/blacklist/${userId}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'), // Ganti dengan token yang sesuai
        },
      });
      alert('User blacklist status toggled successfully');
      window.location.reload(); // Reload page to see updated list
    } catch (error) {
      console.error('Error toggling blacklist:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggleBlacklist}>Toggle Blacklist</button>
    </div>
  );
};

export default UserActions;
