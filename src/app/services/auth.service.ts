import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dominio: string = 'http://127.0.0.1:8000/api/'; // Esta debe ser la URL base de tu API Laravel

  constructor(private http: HttpClient) { }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.dominio}/cambiar-contrasena`, { oldPassword, newPassword });
  }
}
