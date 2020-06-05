import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Score } from '../models/Score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  cargarScore(idSeccion: string, idWod: string, score: string, fecha: string) {
    return this.http.post<any>(`${env.apiUrl}/score`, { idWod: idWod, idSeccion: idSeccion, score: score, fecha: fecha }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }

  consultarScoresEntrenamiento(fecha: string, idPlani: string = "1") {
    return this.http.post<any>(`${env.apiUrl}/score-entrenamiento`, { fecha: fecha, idPlani: idPlani }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } });
  }

  getScoreWod(fecha: string, idPlani: string, idSeccion: string, idWod: string) {
    return this.http.post<any>(`${env.apiUrl}/score-wod`, { idWod: idWod, idSeccion: idSeccion, fecha: fecha, idPlani: idPlani })
  }

  getScoreAtleta() {
    return this.http.get<any>(`${env.apiUrl}/score-atleta`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }
}
