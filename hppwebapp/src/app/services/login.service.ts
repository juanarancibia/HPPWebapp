import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  logInUsuario(Usuario: { email: string; pwd: string }): any {
    this.http
      .post<any>(`${env.apiUrl}/login`, {
        usuario: Usuario.email,
        contrasena: Usuario.pwd,
      })
      .toPromise()
      .then((resultado) => {
        console.log(resultado.token);
        return resultado.token;
      })
      .catch((err) => {
        return err;
      });
  }
}
