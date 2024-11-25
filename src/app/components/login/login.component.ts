import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string ='';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Use UserService to validate the user
      const isValid = this.userService.validateUser(email, password);
  
      if (isValid) {
        // On successful validation, log in the user by storing a token
        this.authService.login();
  
        // Optionally, get the logged-in user if needed
        const user = this.userService.getLoggedInUser();
        console.log('Logged in user:', user);
  
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // Show an error if validation fails
        alert("Invalid mail or password");
      }
    }
  }
  
}
