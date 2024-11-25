import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService, User } from './user.service'; // Adjust the import path as necessary

export interface Vehicle {
  carNumber: string;
  model: string;
  capacity: number;
}

export interface Ride {
  id: number;
  source: string;
  destination: string;
  price: number;
  startTime: string; // Date string
  endTime: string;
  seats: number;
  vehicle: Vehicle;
  rideDate: string; // Ride date
  user?: User; // User who created the ride
}

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private ridesUrl = '/../assets/rides.json'; // URL to fetch rides
  private rides: Ride[] = []; // Temporary storage for rides
  private nextId: number = 1; // For generating unique ride IDs

  constructor(private http: HttpClient, private userService: UserService) {
    this.loadRides(); // Load existing rides on service initialization
  }

  // Load rides from a JSON file
  private loadRides(): void {
    this.http.get<Ride[]>(this.ridesUrl).pipe(
      tap(data => {
        this.rides = data;
        this.nextId = this.rides.length ? Math.max(...this.rides.map(ride => ride.id)) + 1 : 1; // Set next ID
      }),
      catchError(this.handleError<Ride[]>('loadRides', []))
    ).subscribe();
  }

  getRides(): Ride[] {
    return this.rides;
  }

  addRide(ride: Omit<Ride, 'id'>): Ride | null {
    const loggedInUser = this.userService.getLoggedInUser(); // Check for logged-in user
    if (!loggedInUser) {
      console.error('No user is logged in. Cannot add ride.');
      alert("You need to log in to add a ride.");
      return null; // Return null if no user is logged in
    }

    const newRide = { id: this.nextId++, ...ride, user: loggedInUser }; // Include the logged-in user
    this.rides.push(newRide);
    alert("Ride added successfully");
    
    this.saveRides(); // Save updated rides back to JSON (mock implementation)

    return newRide;
  }

  private saveRides(): void {
    const json = JSON.stringify(this.rides, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Download the file (for demonstration purposes)
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rides.json';
    document.body.appendChild(a); // Append to body for Firefox compatibility
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a); // Clean up
  }

  getRidesByCriteria(source: string, destination: string, date: string): Ride[] {
    return this.rides.filter(ride => 
      ride.source.toLowerCase() === source.toLowerCase() &&
      ride.destination.toLowerCase() === destination.toLowerCase() &&
      ride.rideDate === date // Compare the rideDate with the provided date
    );
  }

  sortRidesByStartTime(order: 'asc' | 'desc', rides: Ride[]): Ride[] {
    return rides.sort((a, b) => {
      const timeA = new Date(a.startTime).getTime();
      const timeB = new Date(b.startTime).getTime();
      return order === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }

  getAllRides(): Ride[] {
    return this.rides;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
