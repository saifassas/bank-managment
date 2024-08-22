import { Component } from '@angular/core';
import { User } from '../user'; // Ensure the correct path to your user model
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private registerService: RegisterService) { }

  onSubmit() {
    this.registerService.registerUser(this.user).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        this.errorMessage = null;
        this.goToLogin();
      },
      (error) => {
        this.errorMessage = error.error || 'An error occurred during registration.';
        this.successMessage = null;
      }
    );
  }

  goToLogin() {
    setTimeout(() => {
      this.router.navigate(['../login']);
    }, 2000); // Delay the navigation to give time for the success message to be seen
  }
}
