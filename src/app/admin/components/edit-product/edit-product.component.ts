import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../inter/Product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from '../../inter/File-Handle.model';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id!: number;
  selectedFile: File | null = null;
  product: Product = {
    productId: 0,
    productName: '',
    productPrice: 0,
    productQuantity: 0,
    productDesc: '',
    productImage: <FileHandle>{}
  };

  constructor(
    private service:AdminServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDataFromURL();
  }

  getDataFromURL(): void {
    this.route.paramMap.subscribe(param => {
      this.id = +param.get('id')!;
      if (this.id) {
        this.getItemById(this.id);
      }
    });
  }

  getItemById(id: number): void {
    this.service.getProductById(id).subscribe(
      (response: Product) => {
        console.log(response);
        this.product = response;

        // Ensure productImage is initialized if not already
        if (!this.product.productImage) {
          this.product.productImage = {} as FileHandle;
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

  onFileSelect(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.productImage = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ) as SafeUrl
      };
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

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const productFormData = this.prepareFormData(this.product);

    this.service.updateItem(productFormData).subscribe(
      (response: any) => {
        console.log(response);
        form.resetForm();
        this.router.navigateByUrl('/admin/dashboard');
      },
      (error: any) => {
        alert(error.message);
        form.resetForm();
      }
    );
  }
}
