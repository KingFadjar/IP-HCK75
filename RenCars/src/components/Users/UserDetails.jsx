// src/components/Users/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux'
const UserDetails = () => {
  const { id } = useParams(); // Mengambil ID pengguna dari URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userStore = useSelector(state=>state)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/users/${id}`,{
          headers:{
            Authorization:' Bearer '+ userStore.auth.user.token
          }
        });
        setUser(response.data.user);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Blacklisted:</strong> {user.blacklisted ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
