import { Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
private baseURL="http://localhost:8081/api/v1/accounts"
  constructor(private httpClient:HttpClient) { }

  getAccountsList():Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseURL}`);
  }

  createAccount(account:Account):Observable<any>{ 
    return this.httpClient.post(`${this.baseURL}`,account).pipe(
      catchError(this.handleError)
    )
    
}

  getAccountById(id:number ):Observable<Account>{
    return this.httpClient.get<Account>(`${this.baseURL}/${id}`)
  }
  updateAccount(id:number,account:Account):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,account)
  }
  deleteAccount(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
  private handleError(error: HttpErrorResponse) {
    // Log the error or do any custom error handling here
    return throwError(() => new Error(error.error.message || 'Server error'));
  }

}
