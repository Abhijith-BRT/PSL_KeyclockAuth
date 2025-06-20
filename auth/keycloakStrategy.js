require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

async function configureKeycloakStrategy() {
  try {
    console.log('Configuring Keycloak strategy...');
    console.log('Issuer URL:', process.env.KEYCLOAK_ISSUER);
    console.log('Client ID:', process.env.KEYCLOAK_CLIENT_ID);
    console.log('Redirect URI:', process.env.KEYCLOAK_REDIRECT_URI);
    console.log('Full callback URL:', `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth?client_id=${process.env.KEYCLOAK_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.KEYCLOAK_REDIRECT_URI)}&response_type=code&scope=openid%20profile%20email`);

    passport.use('keycloak', new Strategy({
      issuer: process.env.KEYCLOAK_ISSUER,
      authorizationURL: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
      tokenURL: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      userInfoURL: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
      clientID: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      callbackURL: process.env.KEYCLOAK_REDIRECT_URI,
      scope: 'openid profile email'
    }, function(issuer, sub, profile, accessToken, refreshToken, params, done) {
      console.log('Authentication successful!');
      console.log('User profile:', profile);
      console.log('Access token received:', !!accessToken);
      console.log('Refresh token received:', !!refreshToken);
      console.log('Callback URL used:', process.env.KEYCLOAK_REDIRECT_URI);
      
      // Add token to the profile if needed
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
      console.log('Serializing user:', user);
      done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
      console.log('Deserializing user:', user);
      done(null, user);
    });

    console.log('Keycloak strategy configured successfully!');
  } catch (err) {
    console.error('Keycloak strategy config error:', err);
    console.error('Error details:', err.message);
  }
}

module.exports = configureKeycloakStrategy;
