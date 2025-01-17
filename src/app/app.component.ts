import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,LayoutComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ride-sharing-app';
}
