import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment as env } from "../../environments/environment"
import { Entrenamiento } from '../models/Entrenamiento';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  constructor(private http: HttpClient) { }

  cargarEntrenamiento(entrenamiento: Entrenamiento) {
    this.http.post<any>(`${env.apiUrl}/entrenamiento`, entrenamiento, {
      headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoidGVzdCIsInJvbCI6IkVudHJlbmFkb3IiLCJpYXQiOjE1ODg4NjI4ODl9.ZEVSuKXNMabYhaCdsZqqK606xvoRn6rkt_SPflYEkps" }
    }).toPromise().then(res => {
      console.log(res);
    })
  }

  getEntrenamiento(planificacion: string) {
    return this.http.post<Entrenamiento>(`${env.apiUrl}/planificacion/entrenamiento-dia`, { idPlani: planificacion });
  }



}
