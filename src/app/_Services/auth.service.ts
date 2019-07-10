import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';

@Injectable({providedIn: 'root'})
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _isAdmin: boolean;

  auth0 = new auth0.WebAuth({
    clientID: '2rUVkuYHMQapD',
    domain: 'joshreschke.auth0.com',
    responseType: 'token id_token',
    redirectUri: `${environment.auth0RedirectUrl}`,
    audience: 'https://mealplanner/api',
    scope: 'openid profile read:mealplanner read:recipe create:recipe edit:recipe read:ingredient create:ingredient edit:ingredient'
  });

  constructor(public router: Router, private http:HttpClient) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 36000;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }
  
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/profile']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this.GetUserProfile();
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    document.location.href = "https://rezkey.auth0.com/v2/logout";
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

  GetUserProfile(){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`);
    this.http.get<any>(`${environment.APIURL}user/getuserprofile`, { headers: headers}).subscribe(data => {
      let user: User = data;
      this._isAdmin = user.IsAdmin;
    });
  }


userProfile: any;
public getProfile(cb): void {
  if (!this._accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(this._accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}

}