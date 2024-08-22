import { Component } from '@angular/core';
import { Account } from '../account';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  customers: Customer[] = [];
  account: Account = new Account();

  constructor(private accountService: AccountService,private customerService: CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.account.accountDate = this.formatDate(new Date());
    this.customerService.getCustomersList().subscribe(
      data => this.customers = data,
      error => console.error('Error fetching customers', error)
    );
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  saveAccount(): void {
    this.accountService.createAccount(this.account).subscribe({
      next: () => {
        console.log('Account created successfully');
        this.goToAccount();
        // Perform any additional actions after the account is created
      }, 
      error: (error) => {
        console.error('Error creating account:', error);
      }
    }
    );
  }
onSubmit(){
  console.log(this.account)
  this.saveAccount();
}
goToAccount(){
  this.router.navigate(['/accounts'])
}


}
