import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { Product } from '../../inter/Product';
import { FileHandle } from '../../inter/File-Handle.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  selectedFile: File | null = null;
  product: Product = {
    productId: 0,
    productName: "",
    productDesc: "",
    productPrice: 0,
    productQuantity: 0,
    productImage: <FileHandle>{}
  };

  constructor(
    private service: AdminServiceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ) as SafeUrl 
      };
      this.product.productImage = fileHandle;
    }
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    if (product.productImage && product.productImage.file) {
      formData.append(
        'imageFile',
        product.productImage.file,
        product.productImage.file.name
      );
    }

    return formData;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.product.productName = form.value.name;
    this.product.productPrice = form.value.price;
    this.product.productQuantity = form.value.quantity;
    this.product.productDesc = form.value.desc;

    const productFormData = this.prepareFormData(this.product);

    // Example: Fetch JWT token from storage (replace with your actual token retrieval logic)
    const token = localStorage.getItem('jwt_token'); // Adjust this according to your implementation

    // Add JWT token to headers
    const headers = { Authorization: `Bearer ${token}` };

    this.service.addItem(productFormData).subscribe(
      (response: any) => {
        console.log(response);
        form.resetForm();
        this.router.navigateByUrl("/admin/dashboard");
      },
      (error: any) => {
        console.error('Error occurred while adding item:', error);
        if (typeof error === 'string') {
          alert(error);
        } else {
          alert('An error occurred. Please try again later.');
        }
        form.resetForm();
      }
    );
  }
}
