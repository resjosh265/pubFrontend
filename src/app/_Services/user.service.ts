import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers;

  constructor(private http:HttpClient, private authService:AuthService) { }

  SetHeaders(){
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`);
  }

  GetUserProfile(){
    if (!this.headers){
      this.SetHeaders();
    }
    return this.http.get<any>(`${environment.APIURL}user/getuserprofile`, { headers: this.headers});
  }
}
