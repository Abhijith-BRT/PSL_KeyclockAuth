const express = require('express');
const session = require('express-session');
const passport = require('passport');
const configureKeycloakStrategy = require('./auth/keycloakStrategy');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        console.log('Unauthenticated access to /profile');
        return res.status(401).send('Not logged in');
    }
    console.log('Authenticated user:', req.user);
    res.json(req.user);
});

configureKeycloakStrategy().then(() => {
    app.listen(5000, () => console.log('Node backend on http://localhost:5000'));
});
