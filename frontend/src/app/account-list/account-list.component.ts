import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
accounts :Account[]=[]

  constructor(private accountService: AccountService,private router:Router) { }
ngOnInit(): void {
 this.getAccounts();
}
  private getAccounts(){
  this.accountService.getAccountsList().subscribe(data =>{
    this.accounts=data ; 
    console.log(this.accounts)
  })
}

  updateAccount(id:number){
    this.router.navigate(['update-account',id])
  }
  deleteAccount(id:number){
    this.accountService.deleteAccount(id).subscribe(data=>{
      console.log(data);
      this.getAccounts();
    })
  }


}
