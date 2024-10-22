import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonSearchbar, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../service/BookService';
import { Book } from '../models/Book';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageIdService } from '../service/ManageIdService';

@Component({
  selector: 'app-administration',
  templateUrl: 'administration.page.html',
  styleUrls: ['administration.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    ReactiveFormsModule,
  ],
})
export class AdministrationPage implements OnInit {
  books: Book[] = [];
  bookService = inject(BookService);
  addBookForm: FormGroup; 
  successMessage: string | null = null;
  isFormVisible: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private manageIdService: ManageIdService
  ) {
      // Initialisation du formulaire d'ajout
      this.addBookForm = this.formBuilder.group({
        id: ['0', Validators.required],
        title: ['', Validators.required],
        resume: ['', Validators.required],
        coverURL: ['', Validators.required],
        audioPath: [''],
        maxPage: [0],
        author: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.loadBooks(); // Charger les livres au démarrage
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file; // Stocker le fichier sélectionné
    } else {
      this.selectedFile = null; // Réinitialiser si ce n'est pas un PDF
      alert('Veuillez sélectionner un fichier PDF.');
    }
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
      return b.idBook - a.idBook;
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

  // Méthode pour soumettre le formulaire et ajouter un livre
  onSubmit() {
    if (this.addBookForm.valid) {
      const newBook: Book = this.addBookForm.value;

      // Créer une instance de FormData
      const formData = new FormData();
      formData.append('book', JSON.stringify(newBook)); // Ajouter les détails du livre
      if (this.selectedFile) {
        formData.append('file', this.selectedFile); // Ajouter le fichier PDF
      }

      // Appeler le service pour envoyer les données
      this.manageIdService.addBook(newBook).subscribe(
        (response: any) => {
          console.log('Livre ajouté avec succès', response);
          this.books.push(response);
          this.addBookForm.reset();
          this.successMessage = "Votre livre à été ajouté avec succès !";
          this.isFormVisible = false; 
          
          // Envoi du PDF à l'autre endpoint
          this.uploadPDF(formData);
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du livre', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide. Veuillez corriger les erreurs.', this.addBookForm.errors);
    }
  }

  goBack() {
    this.router.navigate(['/']); 
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible; // Basculer la visibilité du formulaire
  }
  
  uploadPDF(formData: FormData) {

    this.manageIdService.uploadPDF(formData).subscribe(
      (response: any) => {
        console.log('PDF envoyé avec succès', response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi du PDF', error);
      }
    );
  }
}