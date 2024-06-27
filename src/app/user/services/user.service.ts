import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/admin/inter/Product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:8080/api/user";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  // Get all products
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/get-all`).pipe(
      map((products: Product[]) => {
        return products.map(product => {
          if (product.productImage) {
            product.productImage.url = this.sanitizer.bypassSecurityTrustUrl(<string>product.productImage.url) as SafeUrl;
          }
          return product;
        });
      })
    );
  }
}
