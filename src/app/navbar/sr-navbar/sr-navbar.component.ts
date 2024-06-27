import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sr-navbar',
  templateUrl: './sr-navbar.component.html',
  styleUrls: ['./sr-navbar.component.scss']
})
export class SrNavbarComponent implements OnInit {

  constructor(private service:AuthService) { }

  

  isAdminLoggedIn:boolean = this.service.isAdminLoggedIn();
  isUserLoggedIn :boolean=this.service.isUserLoggedIn();

  ngOnInit(): void {
  }

}
