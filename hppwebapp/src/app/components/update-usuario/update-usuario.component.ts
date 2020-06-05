import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { FormGroup, FormBuilder, FormArray, FormControl, CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  usuarios: any = [];
  planificaciones: any = [];
  fg: FormGroup;
  dataSource: any = [];
  searchTerm: string = "";

  constructor(private servicioUsuario: UsuarioService, private servicioPlani: PlanificacionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      busq: [""],
      usuarios: this.fb.array([])
    })

    this.cargarPlanificaciones();
    this.cargarUsuarios();

    this.fg.get('busq').valueChanges.subscribe((term) => {
      this.searchTerm = term;
    })

  }


  cargarUsuarios() {
    return this.servicioUsuario.getUsuarios().subscribe({
      next: resultado => {
        this.usuarios = resultado; this.usuarios.forEach(usuario => {
          this.agregarUsuario(usuario);
        });
      },
      error: err => console.log(err)
    })
  }

  cargarPlanificaciones() {
    this.servicioPlani.getPlanificaciones().subscribe(
      {
        next: plani => { this.planificaciones = plani; },
        error: err => console.log(err)
      }
    )
  }

  initUsuarios(usr) {
    return this.fb.group({
      idPlani: [usr.idPlanificacion],
      rol: [usr.rol],
      nombre: [usr.nombre + " " + usr.apellido],
      email: [usr.email]
    });

  }

  getUsuarios(): FormArray {
    return this.fg.get("usuarios") as FormArray;
  }

  agregarUsuario(usr) {
    this.getUsuarios().push(this.initUsuarios(usr));
  }

  modificarUsuario(i) {
    let usr = this.getUsuarios().at(i).value;
    this.servicioUsuario.modificarUsuario(usr.idPlani, usr.rol, usr.email).subscribe({
      next: resultado => resultado == "Actualizado correctamente" ? window.alert("El usuario " + this.usuarios[i].nombre + " fue modificado con éxito") : window.alert("Ocurrio un error al modificar el usuario"),
      error: err => console.log(err)
    })
    console.log(this.getUsuarios().at(i).value);
  }

}
