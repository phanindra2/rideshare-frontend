import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { AuthService } from './services/authservice.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  returnUrl : any;
  constructor(private authService: AuthService, private router: Router  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('Login status:', isLoggedIn);
    
    if (isLoggedIn) {
      console.log('Access granted to dashboard');
      return true;
    } else {
      console.log('Access denied. Navigat');
    // this.router.navigate(['/login'], { replaceUrl: true });

     this.router.navigateByUrl('/login');
      console.log('Navigation call made to login');
      return false;
      
    }
}
}
