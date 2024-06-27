import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from 'src/app/inter/SignInRequest';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinRequest: SignInRequest = <SignInRequest>{};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSigninForm(form: NgForm) {
    this.signinRequest.email = form.value.email;
    this.signinRequest.password = form.value.password;


    if((this.signinRequest.email!='' && this.signinRequest.password!='') &&(this.signinRequest.email!=null && this.signinRequest.password!=null) )
      {
        this.signinUser(this.signinRequest,form);
        //generate token
      }
    else{
      console.log("Fields are empty...");
    }

  }

  signinUser(data: SignInRequest, form: NgForm) {
    this.authService.doLogin(data.email, data.password).subscribe(
      (response: any) => {
        console.log('Login Response:', response);
        this.authService.loginUser(response.jwt);

        if (response.role==="ADMIN") {
          console.log('Admin logged in');
          this.router.navigateByUrl('/admin/dashboard');
        } else if (response.role==="USER") {
          console.log('User logged in');
          this.router.navigateByUrl('/user/dashboard');
        }
        form.resetForm();
      },
      (error: any) => {
        console.error('Login Error:', error);
        if (error.status === 406) {
          alert('Account is not active. Please register first');
        } 
        else if(error.status == 0)
          {
            alert("Please start server.");
          }
        else {
          alert('Incorrect Email or Password');
        }
      }
    );
  }
}
