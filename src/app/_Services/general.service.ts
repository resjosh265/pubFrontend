import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Carousel } from '../classes/carousel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`);

  constructor(private http:HttpClient, private authService:AuthService) { }

  getCarouselData(){
    //let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`);
    return this.http.get<Carousel[]>(`${environment.APIURL}general/GetCarouselData`);
    //return this.http.get('http://localhost:8841/api/general/GetCarouselData');
  }

  getUserProfile(){
    return this.http.get<any>(`${environment.APIURL}user/getuserprofile`, { headers: this.headers});
  }

  
}
