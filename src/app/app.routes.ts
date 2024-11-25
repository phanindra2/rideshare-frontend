import { RouterModule, Routes } from '@angular/router';
import { SearchRideComponent } from './components/search-ride/search-ride.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard'; // Import the Auth Guard

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Use LayoutComponent for all pages
    children: [
      { path: 'search', component: SearchRideComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard] // Protect the dashboard route with the Auth Guard
      },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
