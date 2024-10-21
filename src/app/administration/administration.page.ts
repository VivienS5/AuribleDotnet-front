import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
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
import { BookService } from '../service/BookService';
import { Book } from '../models/Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administration',
  templateUrl: 'administration.page.html',
  styleUrls: ['administration.page.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
    FormsModule,
  ],
})
export class AdministrationPage implements OnInit {
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
  navigateToEdit(book: Book) {
    // Naviguer vers la page de modification avec l'ID du livre
    this.router.navigate(['/admin-modif', { id: book.idBook }]);
  }
}
