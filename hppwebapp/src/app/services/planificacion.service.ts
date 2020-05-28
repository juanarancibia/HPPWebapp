import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment as env } from "../../environments/environment"
import { Planificacion } from "../models/Planificacion"

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  data = [];

  constructor(private http: HttpClient) { }

  getPlanificaciones() {
    /* this.http.get<any>(`${env.apiUrl}/planificacion`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoidGVzdCIsInJvbCI6IkVudHJlbmFkb3IiLCJpYXQiOjE1ODg4NjI4ODl9.ZEVSuKXNMabYhaCdsZqqK606xvoRn6rkt_SPflYEkps"
      }
    }).toPromise().then(resultado => {
      this.data = resultado;
      console.log("Desde servicio " + resultado);
      return resultado;
    }).catch(err => {
      return err;
    });
  } */

    return this.http.get<Planificacion[]>(`${env.apiUrl}/planificacion`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }
}
