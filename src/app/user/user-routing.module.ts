import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShowProductComponent } from './components/show-product/show-product.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"show-product/:id",component:ShowProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
