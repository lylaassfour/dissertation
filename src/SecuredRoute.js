import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function SecuredRoute({ children }) {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  return children;
}

export default SecuredRoute;