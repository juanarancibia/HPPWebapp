import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Token } from '../models/Token';
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) { }

  logInUsuario(Usuario: { email: string; pwd: string }): any {
    return this.http.post<Token>(`${env.apiUrl}/login`, { usuario: Usuario.email, contrasena: Usuario.pwd });
  }
}
