import { Component } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  customer: Customer = new Customer();
  errorMessage: string = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  saveCustomer() {
    this.customerService.createCustomer(this.customer).subscribe({
      next: (data) => {
        console.log(data);
        this.goToCustomer();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error); // Inspect the error object
  
        if (error.error && typeof error.error === 'object' && error.error.errorMessage) {
          this.errorMessage = error.error.errorMessage;
        } else if (error.message) {
          this.errorMessage = 'An unexpected error occurred: ' + error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Status: ' + (error.status || 'undefined');
        }
        console.error('Error:', error);
      }
    });
  }
  
    onSubmit() {
    console.log(this.customer);
    this.saveCustomer();
  }

  goToCustomer() {
    this.router.navigate(['/Customers']);
  }
}
