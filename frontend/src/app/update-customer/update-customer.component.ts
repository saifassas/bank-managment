import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
customer:Customer=new Customer ;
id:number=0; 
errorMessage: string = '';
constructor(private CustomerService:CustomerService,
  private route:ActivatedRoute,
private router:Router){}
  ngOnInit():void {
    this.id=this.route.snapshot.params['id'];
    this.CustomerService.getCustomerById(this.id).subscribe(data=>{
      this.customer=data;
    })
    
  }
  onSubmit() {
    this.CustomerService.updateCustomer(this.id, this.customer).subscribe({
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
  
  goToCustomer(){
    this.router.navigate(['/Customers'])
    }

}
