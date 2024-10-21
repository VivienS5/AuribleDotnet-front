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
import { ManageIdService } from '../service/ManageIdService';

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

  constructor(private router: Router,
    private manageIdService: ManageIdService,
  ) {}

  ngOnInit() {
    this.loadBooks(); // Charger les livres au démarrage
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data: any) => {
        this.books = data; // Extraire uniquement les livres dans $values
        this.sortBooks(); // Appeler la méthode de tri
        console.table(this.books); // Afficher les livres extraits dans la console
      },
      (error) => {
        console.error('Erreur lors du chargement des livres', error);
      }
    );
  }

  sortBooks() { // Trier par idBook du plus récent au plus ancien
    this.books.sort((a: Book, b: Book) => {
      return a.idBook - b.idBook;
    });
  }
  
  navigateToEdit(book: Book) {
    // Naviguer vers la page de modification avec l'ID du livre
    this.router.navigate(['/admin-modif', { id: book.idBook }]);
  }

  delete(book: Book) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le livre "${book.title}" ?`)) {
      this.manageIdService.deleteBook(book.idBook).subscribe(
        () => {
          console.log('Livre supprimé avec succès');
          // Retirer le livre de la liste après suppression
          this.books = this.books.filter(b => b.idBook !== book.idBook);
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du livre', error);
        }
      );
    }
  }
}