import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import HomePage from './HomePage';
import Login from './Login';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import Signup from './Signup';
import PostLoginOptions from './PostLoginOptions';
import SetupDocumentation from './SetupDocumentation'; // Add this import
import SecuredRoute from './SecuredRoute';
import keycloak from './keycloak';

function App() {
  const onKeycloakTokens = (tokens) => {
    if (tokens.token) {
      localStorage.setItem('access_token', tokens.token);
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      }}
      onTokens={onKeycloakTokens}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-login" element={<PostLoginOptions />} />
          <Route path="/setup-documentation" element={<SetupDocumentation />} /> {/* Add this route */}
          <Route
            path="/dashboard"
            element={
              <SecuredRoute>
                <Dashboard />
              </SecuredRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <SecuredRoute>
                <UserProfile />
              </SecuredRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;