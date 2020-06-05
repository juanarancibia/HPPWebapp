import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http: HttpClient) { }

  deleteSeccion(fecha, idPlani, idSeccion) {
    return this.http.delete<any>(`${env.apiUrl}/seccion?&idPlani=${idPlani}&fecha=${fecha}&idSeccion=${idSeccion}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }
}
