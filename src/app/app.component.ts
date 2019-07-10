import { Component, OnInit } from '@angular/core';
import { AuthService } from './_Services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'game-ladders';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
}

ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
    if (environment.production) {
      if (location.protocol === 'http:') {
       window.location.href = location.href.replace('http', 'https');
      }
     }    
    
    
  }
}