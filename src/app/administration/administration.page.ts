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
  addBookForm: FormGroup;
  editBookForm: FormGroup;
  isFormVisible: boolean = false;
  isEditFormVisible: boolean = false;
  currentBookToEdit: Book | null = null;
  selectedFile: File | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private manageIdService: ManageIdService,
    private router: Router
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

    // Initialisation du formulaire de modification
    this.editBookForm = this.formBuilder.group({
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

  // Charger les livres depuis le service
  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data: any) => {
        this.books = data;
        this.sortBooks(); // Trier par idBook du plus récent au plus ancien
      },
      (error) => {
        console.error('Erreur lors du chargement des livres', error);
      }
    );
  }

  sortBooks() {
    this.books.sort((a: Book, b: Book) => b.idBook - a.idBook);
  }

  // Méthode pour ajouter un livre
  onSubmit() {
    if (this.addBookForm.valid) {
      const newBook: Book = this.addBookForm.value;
      this.manageIdService.addBook(newBook).subscribe(
        (response: any) => {
          console.log('Livre ajouté avec succès', response);
          this.books.push(response);
          this.addBookForm.reset();
          this.successMessage = 'Livre ajouté avec succès !';
          this.isFormVisible = false;
          this.loadBooks();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du livre', error);
        }
      );
    }
  }

  // Méthode pour ouvrir le formulaire d'édition et charger les données du livre
  toggleEditForm(book: Book | null) {
    this.isEditFormVisible = !this.isEditFormVisible;
    if (book) {
      this.currentBookToEdit = book;
      this.editBookForm.patchValue({
        title: book.title,
        resume: book.resume,
        coverURL: book.coverURL,
        author: book.author,
      });
    } else {
      this.currentBookToEdit = null; // Réinitialiser en fermant le formulaire
    }
  }

  // Méthode pour soumettre le formulaire de modification
  onEditSubmit() {
    if (this.editBookForm.valid && this.currentBookToEdit) {
      const updatedBook = { ...this.currentBookToEdit, ...this.editBookForm.value };

      this.manageIdService.updateBook(updatedBook.idBook, updatedBook).subscribe(
        (response) => {
          console.log('Livre mis à jour avec succès', response);
          this.isEditFormVisible = false; // Masquer le formulaire après modification
          this.loadBooks(); // Recharger la liste des livres
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du livre', error);
        }
      );
    }
  }

  // Méthode pour supprimer un livre
  delete(book: Book) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le livre "${book.title}" ?`)) {
      this.manageIdService.deleteBook(book.idBook).subscribe(
        () => {
          console.log('Livre supprimé avec succès');
          this.books = this.books.filter(b => b.idBook !== book.idBook);
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du livre', error);
        }
      );
    }
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

  goBack() {
    this.router.navigate(['/']); 
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}