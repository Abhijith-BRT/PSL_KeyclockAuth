import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const isBrowser = typeof window !== 'undefined';

const oidcConfig = {
  authority: 'http://192.168.200.120:8080/realms/PSL_Realm_I',
  client_id: 'PSL_OIDC_Client',
  redirect_uri: 'http://localhost:3000/callback',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  scope: 'openid profile email',
  monitorSession: true,
  loadUserInfo: true,
  revokeTokensOnSignout: true,
  ...(isBrowser && {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  }),
};

const userManager = isBrowser ? new UserManager(oidcConfig) : null;

export default userManager;
