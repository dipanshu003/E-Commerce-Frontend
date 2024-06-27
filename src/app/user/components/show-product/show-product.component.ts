import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/admin/inter/File-Handle.model';
import { Product } from 'src/app/admin/inter/Product';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  quantity: number = 1;
  id!: number;
  product: Product = {
    productId: 0,
    productName: '',
    productPrice: 0,
    productQuantity: 0,
    productDesc: '',
    productImage: {
      file: new File([], ''),  // Placeholder empty file
      url: ''
    }
  };

  constructor(private route: ActivatedRoute, private service: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getDataFromURL();
  }

  getDataFromURL(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get("id");
      if (id) {
        this.id = +id;
        this.getItemById(this.id);
      }
    });
  }

  getItemById(id: number): void {
    this.service.getProductById(id).subscribe(
      (response: Product) => {
        this.product = response;
        if (!this.product.productImage) {
          this.product.productImage = {
            file: new File([], ''),  // Placeholder empty file
            url: ''
          };
        }
      },
      (error: any) => {
        if (error.status === 0) {
          alert('Please start the server...');
        }
        console.error(error);
      }
    );
  }

  onAddCart(): void {
    const totalAmount = this.product.productPrice * this.quantity;
    const isConfirmed = confirm(`Total Amount is: ${totalAmount}`);

    if (isConfirmed) {
      alert("Your Order placed Successfully...");
      this.router.navigateByUrl("/user/dashboard");
    }
  }
}
