import { Component, OnInit, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { pause, playCircle, ellipsisVertical } from 'ionicons/icons';
import { provideHttpClient } from '@angular/common/http'; // Utilisation de provideHttpClient
import { BookService } from '../service/BookService';
import { Book } from '../models/Book';

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
export class Tab1Page implements OnInit {
  books: Book[] = []; // Stocker les livres récupérés
  bookService = inject(BookService); // Injection directe du service standalone

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBooks(); // Charger les livres au démarrage
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data: any) => {
        this.books = data; // Extraire uniquement les livres dans $values

        console.table(this.books); // Afficher les livres extraits dans la console
      },
      (error) => {
        console.error('Erreur lors du chargement des livres', error);
      }
    );
  }

  goToPage2(book: Book) {
    this.router.navigate(['/2'], {
      queryParams: { data: JSON.stringify(book) },
    });
  }
}
