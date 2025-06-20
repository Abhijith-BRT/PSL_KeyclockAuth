const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'http://192.168.200.120:8080/realms/PSL_Realm_I/protocol/openid-connect/certs'
  }),
  audience: 'PSL_OIDC_Client',
  issuer: 'http://192.168.200.120:8080/realms/PSL_Realm_I',
  algorithms: ['RS256']
});

app.get('/profile', checkJwt, (req, res) => {
  res.json({ message: 'Token valid', user: req.user });
});

app.listen(5000, '0.0.0.0', () => console.log('Resource server running on http://192.168.200.120:5000'));
