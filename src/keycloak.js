import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8181',
  realm: 'AccessPilot',
  clientId: 'react-app',
});

export default keycloak;



/*
  http://localhost:8181/realms/AccessPilot/protocol/openid-connect/auth?client_id=accesspilot-client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=d4d14b18-f6ad-4564-bbb7-b0c273e80818&response_mode=fragment&response_type=code&scope=openid&nonce=2e1226ad-b2c2-4d0c-90f8-bf05d3468a8f&code_challenge=wQdswGR0r3g3ogrv4oTvTerkNepRRWLlc5gWMwpugiI&code_challenge_method=S256

  http://localhost:8181/realms/master/protocol/openid-connect/auth?client_id=security-admin-console&redirect_uri=http%3A%2F%2Flocalhost%3A8181%2Fadmin%2Fmaster%2Fconsole%2F%23%2FAccessPilot%2Fclients&state=e2248dc9-7858-4c2c-b6ab-080eb6daa72b&response_mode=query&response_type=code&scope=openid&nonce=f77aae08-7b77-46cd-ad57-632c73b60849&code_challenge=FxEHfvP5W_THRfIaE1YfnG8ka_fImdrqOwcZdi7UkDE&code_challenge_method=S256

*/