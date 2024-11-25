import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatListModule } from '@angular/material/list';
import { User, UserService } from '../../services/user.service';
import { RideService, Ride } from '../../services/ride.service';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule


  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isOfferingRide: boolean = false;
isSearchingRide: boolean = false;
today : String;
  userName: string = '';
  upcomingRides = [
    { details: 'Ride to Airport on 2024-10-22' },
    { details: 'Ride to Downtown on 2024-10-23' }
  ];
  rideHistory = [
    { details: 'Completed Ride to the Mall on 2024-10-01' },
    { details: 'Completed Ride to the Park on 2024-10-05' }
  ];
  currentPromotion: string | null = 'Get 10% off on your next ride!';
  user: User | null = null;

  newRide: Omit<Ride, 'id'> = {
    source: '',
    destination: '',
    startTime: '',
    endTime: '',
    price: 0,
    seats: 1,
    vehicle: {
      carNumber: '',
      model: '',
      capacity: 0,
    },
    rideDate: ''
  };

  // Declare searchCriteria property
  searchCriteria = {
    source: '',
    destination: '',
    rideDate: ''
  };

  constructor(private userService: UserService, private rideService: RideService) {
    this.today = new Date().toISOString().split('T')[0]; 
  }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    if (this.user) {
      this.userName = this.user.name;
    }
  }

 

  resetNewRide(): void {
    this.newRide = {
      source: '',
      destination: '',
      startTime: '',
      endTime: '',
      price: 0,
      seats: 1,
      vehicle: {
        carNumber: '',
        model: '',
        capacity: 0,
      },
      rideDate: ''
    };
  }

  offerRide(): void {
    if (this.validateRide(this.newRide)) {
      this.rideService.addRide(this.newRide);
      this.resetNewRide();
      this.isOfferingRide = false;
    } else {
      console.error('Ride details are not valid');
    }
  }

  validateRide(ride: Omit<Ride, 'id'>): boolean {
    return (
      !!ride.source &&
      !!ride.destination &&
      !!ride.startTime &&
      !!ride.endTime &&
      ride.price > 0 &&
      ride.seats > 0
    );
  }


// Update your toggle methods
toggleOfferRide(): void {
  this.isOfferingRide = !this.isOfferingRide;
  if (this.isOfferingRide) {
    this.isSearchingRide = false; // Close search card
  } else {
    this.resetNewRide();
  }
}

toggleSearchRide(): void {
  this.isSearchingRide = !this.isSearchingRide;
  if (this.isSearchingRide) {
    this.isOfferingRide = false; // Close offer card
  }
}


  // Add any additional methods for searching rides if needed
  searchRides(){

  }
}
