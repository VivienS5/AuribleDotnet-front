import { Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';

export const routes: Routes = [
  {
    path: '',
    component: Tab1Page, // Composant autonome de la page d'accueil
    pathMatch: 'full',
  },
  {
    path: '2', // Pas de / au début de la route
    loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page), // Composant autonome pour "Tab2"
  },
  {
    path: 'administration', // Pas de / au début de la route
    loadComponent: () => import('./administration/administration.page').then((m) => m.AdministrationPage), // Composant autonome pour "Tab2"
  },

];
