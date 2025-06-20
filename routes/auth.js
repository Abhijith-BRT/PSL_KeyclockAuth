const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
    console.log('GET /auth/login hit');
    next();
}, passport.authenticate('keycloak'));

router.get('/callback', (req, res, next) => {
    console.log('GET /auth/callback hit');
    next();
}, passport.authenticate('keycloak', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/auth/login',
}), (req, res) => {
    console.log('Callback hit, user session:', req.session);
    if (req.user) {
        console.log('Authenticated user:', req.user);
    }
});

router.get('/logout', (req, res) => {
    console.log('GET /auth/logout hit');
    req.logout(() => {
        console.log('User logged out, session:', req.session);
        res.redirect('http://localhost:8080/realms/PSL_Realm_1/protocol/openid-connect/logout?redirect_uri=http://localhost:3000');
    });
});

module.exports = router;
