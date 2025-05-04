import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './Dashboard.css';

const Dashboard = () => {
  const { keycloak, initialized } = useKeycloak();
  const [users, setUsers] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const token = localStorage.getItem('access_token');

      // Fetch users
      fetch('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch users');
          return res.json();
        })
        .then((data) => setUsers(data))
        .catch((err) => {
          console.error('Error fetching users:', err);
          setError('Failed to load users');
          // Fallback mock data
          setUsers([
            { id: 1, username: 'john_doe', role: 'Admin', status: 'Active', lastLogin: '10:42 AM' },
            { id: 2, username: 'jane_smith', role: 'User', status: 'Inactive', lastLogin: '9:30 AM' },
            { id: 3, username: 'bob_jones', role: 'User', status: 'Active', lastLogin: '11:00 AM' },
          ]);
        });

      // Fetch recent activities
      fetch('http://localhost:3001/api/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch activities');
          return res.json();
        })
        .then((data) => setRecentActivities(data))
        .catch((err) => {
          console.error('Error fetching activities:', err);
          setError('Failed to load activities');
          // Fallback mock data
          setRecentActivities([
            { user: 'john_doe', action: 'Logged in', time: '10:42 AM' },
            { user: 'admin123', action: 'Updated permissions', time: '9:20 AM' },
            { user: 'jane_smith', action: 'Changed password', time: '8:50 AM' },
          ]);
        });
    }
  }, [initialized, keycloak.authenticated]);

  const handleAddUser = () => {
    alert("Add User functionality coming soon!");
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="dashboard-subtitle">
        Manage users, monitor system activity, and configure access settings
      </p>
      {error && <p className="error">{error}</p>}

      {/* Summary Cards */}
      <div className="dashboard-section">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Active Sessions</h3>
          <p>12</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Requests</h3>
          <p>4</p>
        </div>
      </div>

      {/* User Management */}
      <div className="user-management">
        <h2>User Management</h2>
        <button className="add-user-btn" onClick={handleAddUser}>
          Add New User
        </button>
        <div className="user-list">
          <h3>User List</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="activity-log">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.user}</strong> {activity.action} at {activity.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;