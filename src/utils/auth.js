import * as auth0 from 'auth0-js';

export class Auth {

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
    audience: 'https://' + process.env.REACT_APP_AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.putInStorage(authResult.accessToken, authResult.idToken,
            authResult.expiresIn * 1000 + new Date().getTime());

          resolve(authResult);
        } else if (err) {
          reject(err);
        } else {
          reject(null);
        }
      });
    });
  }

  getProfile(accessToken) {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
        }

        resolve(profile || {});
      });
    });
  }

  renewToken() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({},
        (err, authResult) => {
          if (err) {
            reject(err);
          } else {
            this.putInStorage(authResult.accessToken, authResult.idToken,
              authResult.expiresIn * 1000 + new Date().getTime());

            resolve(authResult);
          }
        }
      );
    });
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    this.clearStorage();
  }

  putInStorage(accessToken, idToken, expiresAt) {
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  clearStorage() {
    localStorage.removeItem('expires_at');
  }

  storageExpired() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() >= expiresAt;
  }

}

const auth = new Auth();

export default auth;
