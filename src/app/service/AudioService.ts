import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private baseUrl = 'http://localhost:5176/audio'; // Change avec ton vrai URL

  constructor(private http: HttpClient) {}

  getAudioByBookId(bookId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${bookId}`, { responseType: 'blob' });
  }
}
