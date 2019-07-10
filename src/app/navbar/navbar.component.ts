import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen: boolean = false;
  isAdmin: boolean;

  constructor(public _AuthService: AuthService, public userService: UserService) { }

  ngOnInit() {
    
  }

  ngAfterContentInit(){
  }

  toggleNavbar(){
    if (this.navbarOpen == false){
      this.navbarOpen = true;
    }else{
      this.navbarOpen = false;
    }
  }

  onNavigation(){
    this.navbarOpen = false;
  }

}
