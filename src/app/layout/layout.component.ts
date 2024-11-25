import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isModalOpen = false;
  isDropdownOpen = false;
  isLoggedIn = false; 
  isAboutUsVisible = false;
  isContactVisible = false;
  logoutMessageVisible = false; // Flag for logout message visibility
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the loggedIn state
    this.subscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Clean up subscription
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openTerms(event: Event) {
    event.preventDefault();
    this.isModalOpen = true;
  }

  closeTerms() {
    this.isModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.logoutMessageVisible = true; // Show logout message
  }

  confirmLogout() {
    this.logoutMessageVisible = false; // Hide logout message
    this.router.navigate(['/search']); // Redirect to the search page
  }

  toggleAboutUs() {
    this.isAboutUsVisible = !this.isAboutUsVisible;
    this.isContactVisible = false;
  }

  toggleContact() {
    this.isContactVisible = !this.isContactVisible;
    this.isAboutUsVisible = false;
  }
}
