import { Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    pathMatch: 'full',
    canActivate: [MsalGuard],
  },
  {
    path: '2',
    loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page),
    canActivate: [MsalGuard],
  },
  {
    path: 'administration', // Pas de / au début de la route
    loadComponent: () =>
      import('./administration/administration.page').then(
        (m) => m.AdministrationPage
      ), // Composant autonome pour "Tab2"
  },
];
