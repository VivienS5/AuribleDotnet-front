import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular/ionic-module';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { pause } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonIcon,
    IonSearchbar,
    IonCard,
    IonCardContent,
  ],
})
export class Tab1Page {
  books = [
    { title: 'SOUL', author: 'Olivia Wilson', cover: 'assets/soul.jpeg' },
    { title: 'SOUL', author: 'Olivia Wilson', cover: 'assets/soul.jpeg' },
    { title: 'SOUL', author: 'Olivia Wilson', cover: 'assets/soul.jpeg' },
  ];
  constructor(private router: Router) {}
  goToPage2() {
    this.router.navigate(['/2']);
  }
}
