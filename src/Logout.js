import React from 'react';
import keycloak from './keycloak';

function Logout() {
  const logout = () => {
    keycloak.logout();
  };

  return (
    <button onClick={logout}>
      Log out
    </button>
  );
}

export default Logout;
