import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogout()
  {
    this.service.logout();
    this.router.navigateByUrl("/");
  }

}
