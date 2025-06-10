require('dotenv').config();
const { discovery, allowInsecureRequests } = require('openid-client');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

async function configureKeycloakStrategy() {
    try {

        const issuerUrl = new URL(process.env.KEYCLOAK_ISSUER);
        console.log('Issuer URL:', issuerUrl);
        const issuerMetadata = await discovery(issuerUrl, {
            algorithm: 'oidc',
            execute: [allowInsecureRequests],
        });

        // const issuerMetadata = await discovery(
        //     process.env.KEYCLOAK_ISSUER,
        //     process.env.KEYCLOAK_CLIENT_ID,
        //     process.env.KEYCLOAK_CLIENT_SECRET
        // );

        console.log('Issuer Metadata:', issuerMetadata);

        passport.use('keycloak', new Strategy({
            issuer: process.env.KEYCLOAK_ISSUER,
            authorizationURL: issuerMetadata.authorization_endpoint,
            tokenURL: issuerMetadata.token_endpoint,
            userInfoURL: issuerMetadata.userinfo_endpoint,
            clientID: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            callbackURL: process.env.KEYCLOAK_REDIRECT_URI,
            scope: 'openid profile email',
        }, (issuer, sub, profile, accessToken, refreshToken, done) => {
            return done(null, profile);
        }));

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
    } catch (err) {
        console.error('Keycloak strategy config error:', err);
    }
}

module.exports = configureKeycloakStrategy;