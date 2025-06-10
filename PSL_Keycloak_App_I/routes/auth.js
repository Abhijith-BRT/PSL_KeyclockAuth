const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', passport.authenticate('keycloak'));

router.get('/callback', passport.authenticate('keycloak', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/auth/login',
}), (req, res) => {
    console.log('Callback hit, user session:', req.session);
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://localhost:8080/realms/PSL_Realm_1/protocol/openid-connect/logout?redirect_uri=http://localhost:3000');
    });
});

module.exports = router;
