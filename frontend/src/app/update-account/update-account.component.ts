import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
account:Account = new Account();
customers: Customer[] = [];
id:number=0;  

constructor( private accountService:AccountService,
  private route:ActivatedRoute,
  private customerService:CustomerService,private router:Router){} 
  ngOnInit():void {
    this.id=this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=>{
      this.account=data;
    })
    this.customerService.getCustomersList().subscribe(
      data => this.customers = data,
      error => console.error('Error fetching customers', error)
    );
    
  }
  onSubmit(){
    this.accountService.updateAccount(this.id,this.account).subscribe(data=>{
      console.log(data)
      this.goToAccount();
    })
  }
  goToAccount(){
    this.router.navigate(['/accounts'])
    }
}
