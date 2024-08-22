import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '  ';
  isSidebarOpen = true;
  isCustomerMenuOpen = false;
  isAccountMenuOpen = false;
  currentRoute: string = '';
  constructor(private router: Router){}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleCustomerMenu() {
    this.isCustomerMenuOpen = !this.isCustomerMenuOpen;
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('NavigationEnd event');
        console.log('URL after redirects:', event.urlAfterRedirects);
        this.currentRoute = event.urlAfterRedirects;
      });
  }
  logout() {
    // Clear the token or any other session data
    localStorage.removeItem('accessToken');

    // Optionally, clear any other data related to the user session
    localStorage.removeItem('userData');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  
  

  
}
