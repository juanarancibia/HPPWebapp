import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WodService {

  constructor(private http: HttpClient) { }

  getWod(fecha, idPlani, idSeccion, idWod) {
    return this.http.get<JSON>(`${env.apiUrl}/wod?&idPlani=${idPlani}&fecha=${fecha}&idSeccion=${idSeccion}&idWod=${idWod}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }

  deleteWod(fecha, idPlani, idSeccion, idWod) {
    return this.http.delete<any>(`${env.apiUrl}/wod?&idPlani=${idPlani}&fecha=${fecha}&idSeccion=${idSeccion}&idWod=${idWod}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }
}
