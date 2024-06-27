import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  registerUser(jsonObj: any): Observable<any> {
    return this.http.post(`${this.baseURL}/sign-up`, jsonObj);
  }

  doLogin(email:string,password:string)
  {
     return this.http.post(`${this.baseURL}/authenticate`,{email,password});
  }

  loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == null || token == '') {
      return false;
    }
    else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserRole(): string {
    const user = this.getUser();
    if (!user) {
      return "";
    }
    return user.role;
  }

  getUser(): any {
    const userId = this.getUserId();
    return userId ? JSON.parse(userId) : null;
  }


  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }

  isUserLoggedIn(): boolean {
    return this.hasToken() && this.getUserRole() === "USER";
  }
  isAdminLoggedIn() :boolean {
    return this.hasToken() && this.getUserRole() === "ADMIN";
  }


}
