import { Component } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RideService, Ride } from '../../services/ride.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-ride',
  standalone: true,
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.css'],
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepicker,
    MatDatepickerModule
  ],
})
export class SearchRideComponent {
  source: string = '';
  destination: string = '';
  selectedDate: Date | null = null;
  today: Date = new Date();
  rides: Ride[] = [];

  constructor(private ridesService: RideService,private router:Router) {
    this.today.setHours(0, 0, 0, 0);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value || null;
  }

  onSearch() {
    // if (this.selectedDate) {
    //   const dateString = this.selectedDate.toISOString().split('T')[0]; // Format date
    //   this.rides = this.ridesService.getRidesByCriteria(this.source, this.destination, dateString);
    // }
  }

  navigateToUser(userId: number) {
    // Logic to navigate to user details, using userId
  }
  viewUserData(user: any) {
    // Navigate to the user details page, or display user info in a modal, etc.
    // For example, navigate to a user details page using their ID
    if (user) {
      this.router.navigate(['/user', user.email]); // Adjust the route as needed
    }
}
}
