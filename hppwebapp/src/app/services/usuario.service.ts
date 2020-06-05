import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${env.apiUrl}/usuarios`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }


  modificarUsuario(idPlani, rol, email) {
    return this.http.put<any>(`${env.apiUrl}/usuarios`, { idPlani: idPlani, mail: email, rol: rol }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }

  modificarPerfil(email, nombre, apellido, sexo, fechaNac, pwd, nuevaPwd) {
    return this.http.put<any>(`${env.apiUrl}/usuarios`, {
      mail: email,
      nombre: nombre,
      apellido: apellido,
      sexo: sexo,
      fechaNac: fechaNac,
      pwd: pwd,
      nuevaPwd: nuevaPwd
    }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }


  getPerfil() {
    return this.http.get<any>(`${env.apiUrl}/perfil`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
  }

}
