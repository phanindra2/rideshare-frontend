import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  // Observable for other components to subscribe to
  isLoggedIn$ = this.loggedInSubject.asObservable();

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false; // Not in the browser
  }

  login(): void {
    localStorage.setItem(this.tokenKey, 'mockToken'); // Store a mock token on login
    this.loggedInSubject.next(true); // Emit the new logged-in state
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token on logout
    this.loggedInSubject.next(false); // Emit the new logged-out state
  }
}
