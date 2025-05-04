import React from 'react';
import keycloak from './keycloak';
import { Link } from 'react-router-dom';

function NavBar({ authenticated }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {authenticated ? (
          <li><button onClick={() => keycloak.logout()}>Logout</button></li>
        ) : (
          <li><button onClick={() => keycloak.login()}>Login</button></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
