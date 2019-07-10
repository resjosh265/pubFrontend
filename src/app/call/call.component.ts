import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../_Services/auth.service';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  message: string;
  token: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  public ngOnInit(): void {
    this.message = '';
    this.token = this.auth.accessToken;
  
  }

}

