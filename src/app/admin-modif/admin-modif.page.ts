import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageIdService } from '../service/ManageIdService';
import { Book } from '../models/Book';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule

@Component({
  selector: 'app-admin-modif',
  templateUrl: './admin-modif.page.html',
  styleUrls: ['./admin-modif.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdminModifPage implements OnInit {
  book: Book | null = null;
  updateForm: FormGroup;
  isUpdated = false; // Nouvelle variable

  constructor(
    private route: ActivatedRoute,
    private manageIdService: ManageIdService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      resume: ['', Validators.required],
      coverURL: ['', Validators.required],
      audioPath: ['', Validators.required],
      maxPage: [0, [Validators.required, Validators.min(1)]],
      author: ['', Validators.required],
    });
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBook(bookId);
    }
  }

  loadBook(id: string) {
    this.manageIdService.getBookById(id).subscribe(
      (data: Book) => {
        console.log('Données du livre', data);
        this.book = data;
        this.updateForm.patchValue(data); // Remplir le formulaire avec les données du livre
      },
      (error: any) => {
        console.error('Erreur lors du chargement du livre', error);
      }
    );
  }

  onSubmit() {
    if (this.updateForm.valid && this.book) {
      const updatedBook = { ...this.book, ...this.updateForm.value }; // Fusionner les données
      this.manageIdService.updateBook(this.book.idBook, updatedBook).subscribe(
        (response: any) => {
          console.log('Livre mis à jour :', response);
          this.isUpdated = true;
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du livre', error);
        }
      );
    }
  }
}
