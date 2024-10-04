import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import './UserList.css';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const userStore = useSelector(state=>state)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users/users',{
        headers:{
          Authorization:' Bearer '+ userStore.auth.user.token
        }
      });
      setUsers(response.data.users);
    };
    fetchUsers();
  }, []);
  console.log('user')
  return (
    <div>
      <h1>User List</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={()=>{
              navigate(`/api/users/${user.id}`)
            }}>user detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
