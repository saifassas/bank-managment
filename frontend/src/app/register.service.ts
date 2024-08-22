import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseURL = 'http://localhost:8081/api/auth/register';

  constructor(private httpClient: HttpClient) { }

  // Method to register a user
  registerUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }
}