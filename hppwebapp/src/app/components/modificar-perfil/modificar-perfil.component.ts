import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  fg: FormGroup;

  constructor(private fb: FormBuilder, private servicioUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      email: [""],
      pwd: [""],
      Nuevapwd: [""],
      sexo: [null],
      fechaNac: [""]
    })

    this.inicializarForm();
  }

  inicializarForm() {
    this.servicioUsuario.getPerfil().subscribe({
      next: res => {
        console.log(res);
        this.fg = this.fb.group({
          nombre: [res.nombre, [Validators.required]],
          apellido: [res.apellido, [Validators.required]],
          email: [res.email],
          pwd: [""],
          Nuevapwd: [""],
          sexo: [res.sexo],
          fechaNac: [res.fechaNac]
        })
      },
      error: err => console.log(err)
    });
  }

  actualizar() {
    var formulario = this.fg.value;
    console.log(formulario.nombre ? formulario.nombre : "");
    console.log(formulario.apellido ? formulario.apellido : "");
    console.log(formulario.pwd ? formulario.pwd : "");
    console.log(formulario.Nuevapwd ? formulario.Nuevapwd : "");
    console.log(formulario.sexo ? formulario.sexo : "");
    console.log(formulario.fechaNac ? formulario.fechaNac : "");

    this.servicioUsuario.modificarPerfil(formulario.email,
      formulario.nombre ? formulario.nombre : "",
      formulario.apellido ? formulario.apellido : "",
      formulario.sexo ? formulario.sexo : "",
      formulario.fechaNac ? formulario.fechaNac : "",
      formulario.pwd ? formulario.pwd : "",
      formulario.Nuevapwd ? formulario.Nuevapwd : "").subscribe({
        next: res => res == "Actualizado correctamente" ? window.alert(res) : window.alert(res),
        error: err => console.log(err)
      });
  }

}
