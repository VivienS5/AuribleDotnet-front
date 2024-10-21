import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Standalone service
})
export class BookService {
  private apiUrl = 'http://localhost:5176/book'; // URL de l'API

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    // Définir les headers pour l'appel API
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Permet l'origine de toutes les requêtes (si autorisé par le serveur)
    });

    return this.http.get<any>(this.apiUrl, { headers }); // Passer les headers dans l'appel API
  }
}
