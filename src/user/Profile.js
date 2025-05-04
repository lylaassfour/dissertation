import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user details
  const fetchUserDetails = async () => {
    const response = await axios.get('/api/user');
    setUserDetails(response.data);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userDetails ? (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          {/* You can add more details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
