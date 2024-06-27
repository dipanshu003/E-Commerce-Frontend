// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { Product } from '../../inter/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private service: AdminServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAllProduct();
  }

  fetchAllProduct(): void {
    this.service.getAllProduct().subscribe(
      (response: Product[]) => {
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

  onDelete(product: Product): void {
    const id = product.productId;

    const wantToDelete = confirm(`Are you sure you want to remove ${product.productName}?`);

    if (wantToDelete) {
      this.service.deleteProduct(id).subscribe(
        () => {
          console.log(`Product with ID ${id} deleted successfully.`);
          this.fetchAllProduct(); // Refresh product list after deletion
        },
        (error: any) => {
          console.error(`Error deleting product with ID ${id}:`, error);
        }
      );
    }
  }
}
