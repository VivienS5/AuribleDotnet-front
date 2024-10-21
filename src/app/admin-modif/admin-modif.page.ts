import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageIdService } from '../service/ManageIdService';
import { Book } from '../models/Book';
import { CommonModule } from '@angular/common'; // Ajout de CommonModule

@Component({
  selector: 'app-admin-modif',
  templateUrl: './admin-modif.page.html',
  styleUrls: ['./admin-modif.page.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule ici

})
export class AdminModifPage implements OnInit {
  book: Book | null = null;

  constructor(private route: ActivatedRoute, private manageIdService: ManageIdService) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID du livre
    if (bookId) {
      this.loadBook(bookId); // Charger le livre correspondant
    }
  }

  loadBook(id: string) {
    this.manageIdService.getBookById(id).subscribe(
      (data: Book) => {
        console.log('Données du livre', data);
        this.book = data; // Charger les données du livre
      },
      (error: any) => {
        console.error('Erreur lors du chargement du livre', error);
      }
    );
  }
}
