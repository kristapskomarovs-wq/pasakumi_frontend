import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Pieslēgšanās' },
  {
    path: 'events',
    loadComponent: () => import('./events/events').then(m => m.EventsComponent),
    title: 'Pasākumi',
    canActivate: [authGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./create-event/create-event').then(m => m.CreateEventComponent),
    title: 'Izveidot pasākumu',
    canActivate: [authGuard]
  },
  {
    path: 'my-events',
    loadComponent: () => import('./my-events/my-events').then(m => m.MyEventsComponent),
    title: 'Mani pasākumi',
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];