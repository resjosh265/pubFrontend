import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carousel } from '../classes/carousel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageresolveService implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any>{
    return this.http.get<Carousel[]>(`${environment.APIURL}recipe/GetCarouselData`);
  }
}
