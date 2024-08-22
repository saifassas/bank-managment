import { Customer } from "./customer";

export class Account {
    accountId: number=0;
    accountDate: string=""; // Adjust the type if necessary
    accountBalance: number=0; // Adjust the type if necessary
    accountCategory: string="";
    customer: Customer = new Customer(); // Assuming you have a Customer class defined
  
    constructor(data: Partial<Account> = {}) {
      Object.assign(this, data);
    }
  }