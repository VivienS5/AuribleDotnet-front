import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { pause } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonButtons,
    IonBackButton,
  ],
})
export class Tab2Page {
  constructor(private router: Router) {}
  goToHome() {
    this.router.navigate(['/2']);
  }
}
