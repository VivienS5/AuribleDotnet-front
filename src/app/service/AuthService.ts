import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root', // Standalone service
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(): Observable<boolean> {
    return this.http.get<LoginResponse>('http://localhost:5176/auth/login').pipe(
      map((res: LoginResponse) => {
        console.log(res);
        return res.isAdmin;  // retourne true si administrateur
      }),
      catchError((error) => {
        console.error(error);
        return of(false);  // retourne false en cas d'erreur
      })
    );
  }
}

interface LoginResponse {
  isAdmin: boolean;
}
