import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { pause } from 'ionicons/icons';
import { Book } from '../models/Book';

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
export class Tab2Page implements OnInit {
  receivedBook: Book = {
    idBook: 0,
    title: 'waiting',
    resume: 'waiting',
    coverURL: 'waiting',
    audioPath: 'waiting',
    maxPage: 0,
    author: 'waiting',
    chapters: [],
  };
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.receivedBook = JSON.parse(params['data']);
        console.log(this.receivedBook); // Affiche le livre passé
      }
    });
  }
  goToHome() {
    this.router.navigate(['/2']);
  }
}
