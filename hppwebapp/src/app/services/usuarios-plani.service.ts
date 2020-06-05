import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuariosPlaniService {

  constructor(private http: HttpClient) { }

  getUsersPlani() {
    return this.http.get<any>(`${env.apiUrl}/getUserPlani`);
  }

  updatePlaniUser(mail: string, idPlani: string) {
    return this.http.put<any>(`${env.apiUrl}/updatePlaniUser`, { mail: mail, idPlani: idPlani }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
  }
}
