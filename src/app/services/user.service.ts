import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



export interface User {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = '/../assets/users.json'; // Ensure this is relative and correct
// Correct path

  //private usersUrl = 'assets/users.json'; // Path to your JSON file
  users: User[] = []; // Temporary storage for users
  loggedInUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadUsers(); // Load users on initialization
  }

  private loadUsers(): void {
    this.http.get<User[]>(this.usersUrl).pipe(
      tap(data => this.users = data),
      catchError(this.handleError<User[]>('loadUsers', []))
    ).subscribe();
  }

  registerUser(userData: User): boolean {
    const exists = this.users.some(user => user.email === userData.email);
    if (exists) {
      return false; // User already exists
    }
    this.users.push(userData); // Add new user to the array
    this.saveUsers(); // Save the updated user list
    return true;
  }

  private saveUsers(): void {
    // In a real application, you'd send this data to a backend to save it
    console.log('Updated Users:', JSON.stringify(this.users, null, 2));
    // For demo purposes, you can log it, but in a real app, use a backend
  }

  checkEmailExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  validateUser(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.loggedInUser = user; // Set the logged-in user
      return true;
    }
    return false;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser; // Return the logged-in user
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
