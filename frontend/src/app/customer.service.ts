import { Injectable } from '@angular/core';
import { Customer } from './customer';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  
  private baseURL="http://localhost:8081/api/v1/Customers"
  constructor(private httpClient:HttpClient) { }
  getCustomersList():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}`);
  }
  createCustomer(customer:Customer):Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,customer)
    
}
  getCustomerById(id:number ):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/${id}`)
  }
  updateCustomer(id:number,customer:Customer):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,customer)
  }
  deleteCustomer(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
   
     // Backend returned an unsuccessful response code
      errorMessage = error.error?.errorMessage || `Server returned code ${error.status} with message: ${error.message}`;
    }
  
    console.error('An error occurred:', error);  // Log the error to the console
    return throwError(() => new Error(errorMessage));
  }
}




