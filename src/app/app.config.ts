import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Importeer HomeComponent

const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent } // Voeg Home route toe
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ]
};
