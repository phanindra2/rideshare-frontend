import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Optional: Define custom date formats if needed
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MatNativeDateModule, // Include the date module
    { provide: DateAdapter, useClass: MatNativeDateModule }, // Provide the date adapter
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Use custom date formats if defined
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Optional: Set the locale
  ],
};
