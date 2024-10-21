import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService) {}
  ngOnInit() {
    // Utilise `handleRedirectObservable` pour gérer la redirection après l'authentification
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result) {
          console.log('Login successful!', result);
          // Tu peux gérer les informations de l'utilisateur ici
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
