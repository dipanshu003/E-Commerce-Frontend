import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:SigninComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"user",
    loadChildren:()=>import("./user/user.module").then(m=>m.UserModule)
  },
  {
    path:"admin",
    loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
