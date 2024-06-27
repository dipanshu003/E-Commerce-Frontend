import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/admin/inter/Product';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(private service: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchAllProduct();
  }

  fetchAllProduct(): void {
    this.service.getAllProduct().subscribe(
      (response: Product[]) => {
        console.log('Fetched Products:', response);
        this.products = response;
      },
      (error: any) => {
        console.error('Something went wrong in fetching all products.', error);
      }
    );
  }

  onImageError(product: Product): void {
    console.error('Image load error for product:', product);
  }


}
