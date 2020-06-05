import { Component, OnInit } from '@angular/core';
import { UsuariosPlaniService } from 'src/app/services/usuarios-plani.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  usuarios: any = [];
  planificaciones: any = [];
  fg: FormGroup;

  constructor(private usuarioService: UsuariosPlaniService, private servicioPlani: PlanificacionService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.fg = this.fb.group({
      idPlani: [null]
    })

    this.usuarioService.getUsersPlani().subscribe({
      next: res => this.usuarios = res,
      error: err => console.log(err)
    });
    this.cargarPlanificaciones();
  }

  cargarPlanificaciones() {
    this.servicioPlani.getPlanificaciones().subscribe(
      {
        next: plani => { this.planificaciones = plani },
        error: err => console.log(err)
      }
    )
  }

  updatePlani(mail: string, index: number) {
    if (this.fg.value.idPlani == null) {
      window.alert("Por favor seleccione una planificación");
    } else {
      this.usuarioService.updatePlaniUser(mail, this.fg.value.idPlani).subscribe({
        next: resultado => {
          if (resultado == 1) {
            window.alert("Atleta dado de alta correctamente!");
            this.usuarios = this.usuarios.filter(usuario => usuario.email != mail);
          } else { window.alert("Ocurrio un error al dar de alta al Atleta"); }
        },
        error: err => window.alert(err)
      });
    }
    this.fg.reset();
  }

}
