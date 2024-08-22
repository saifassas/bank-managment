import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }
  private baseUrl="http://localhost:8081/api/auth/login"

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, { username, password }).pipe(
      map((response: any) => {
        // Store the token in local storage
        localStorage.setItem('accessToken', response.accessToken);
        // Optionally, navigate to a different page after a successful login
        this.router.navigate(['/Customers']);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed', error);
        return throwError(() => new Error(error.error || 'Server error'));
      })
    );
  }

}