import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDataRequest } from 'src/app/inter/RegisterDataRequest';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData:RegisterDataRequest=<RegisterDataRequest>{};

  constructor(private service:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSignupForm(form:NgForm){
    if(form.value.password===form.value.cpassword)
      {
        this.registerData.email = form.value.email;
        this.registerData.name = form.value.name;
        this.registerData.password= form.value.password;
        console.log(this.registerData);
        
        this.createUser(this.registerData);
        form.resetForm();
      }
      else{
        alert("Please Match Password...");
        form.resetForm();
      }
  }

  createUser(jsonObj:any)
  {
    this.service.registerUser(jsonObj).subscribe((response:any)=>{
      if(response==true)
        {
          console.log("User Register Successfully...");
          alert("User Register Successfully...");
          this.router.navigateByUrl("/");
        }
    },(error:any)=>{
      alert("User Already Exist...");
    })
  }
}
