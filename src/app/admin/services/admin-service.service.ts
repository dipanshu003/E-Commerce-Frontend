import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../inter/Product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  baseURL: string = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  // Get all products
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/get-all`).pipe(
      map((products: Product[]) => {
        return products.map(product => {
          if (product.productImage && typeof product.productImage.url === 'string') {
            product.productImage.url = this.sanitizer.bypassSecurityTrustUrl(product.productImage.url) as SafeUrl;
          }
          return product;
        });
      })
    );
  }

  // Add item
  addItem(product: FormData): Observable<any> {
    return this.http.post(`${this.baseURL}/add`, product);
  }

  // Delete item
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }

  // Get item by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/get/${id}`);
  }

  // Update item
  updateItem(product: FormData): Observable<any> {
    return this.http.put(`${this.baseURL}/update`, product);
  }
}
