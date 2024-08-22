import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username:string=""
  public password:string=""
  errorMessage: string = '';
  constructor(private authService:AuthService) { }
  public login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        console.log('Login successful', data);
        
        
        this.errorMessage = "";
        
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        if (error.error && typeof error.error === 'object' && error.error.errorMessage) {
          this.errorMessage = error.error.errorMessage;
        } else if (error.message) {
          this.errorMessage = 'Login failed ';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    });
  }
  



}
