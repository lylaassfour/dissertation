const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Set up session store and Keycloak adapter
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak authentication middleware
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
}));

// Protected route
app.get('/profile', keycloak.protect('user'), (req, res) => {
    res.send('This is a protected profile page.');
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
