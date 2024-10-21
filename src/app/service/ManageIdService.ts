import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root', // Standalone service
})
export class ManageIdService {
  private apiUrl = 'http://localhost:5176/manage'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  getBookById(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`; // Correctly use the constructed URL
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  
    return this.http.get<Book>(url, { headers }); // Use the constructed URL here
  }  
}
