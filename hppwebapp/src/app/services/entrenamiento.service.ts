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
      headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
    }).toPromise().then(res => {
      console.log(res);
    })
  }

  getEntrenamiento(planificacion: string = "1", fecha: string = null) {
    return this.http.post<Entrenamiento>(`${env.apiUrl}/planificacion/entrenamiento`, { idPlani: planificacion, fecha: "2020-5-14" }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }

  visibilidadEntrenamiento(idPlani: string, fecha: string, visible: number) {
    return this.http.patch<Entrenamiento>(`${env.apiUrl}/entrenamiento`, { idPlani: idPlani, fecha: fecha, visible: visible });
  }



}
