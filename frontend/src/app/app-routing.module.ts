import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  
  {path:'Customers', component:CustomerListComponent},
  {path:'create-customer', component:CreateCustomerComponent},
  {path:'',redirectTo:'Customers',pathMatch:'full'},
  {path:'update-customer/:id',component:UpdateCustomerComponent},
  // In your component.ts file
  {path:'accounts',component:AccountListComponent},
  {path:'create-account',component:CreateAccountComponent},
  {path:'update-account/:id',component:UpdateAccountComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
