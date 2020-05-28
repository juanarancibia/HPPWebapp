export class Usuario {
  email: string;
  nombre: string;
  apellido: string;
  contrasena: string;
  sexo: string;
  idPlani: number;
  rol: string;
  fechaNac: Date;

  constructor($email: string, $nombre: string, $apellido: string, $pwd: string, $sexo: string, $fechaNac: Date) {
    this.email = $email;
    this.nombre = $nombre;
    this.apellido = $apellido;
    this.contrasena = $pwd;
    this.sexo = $sexo;
    this.idPlani = null;
    this.rol = "Atleta";
    this.fechaNac = $fechaNac;
  }





}
