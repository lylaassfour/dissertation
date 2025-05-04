import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from your Node.js backend
  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  // Call fetch on component mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
    fetchUsers(); // Re-fetch users after deletion
  };

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={fetchUsers}>Refresh Users</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
