import { Component, OnInit } from '@angular/core';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { Planificacion } from 'src/app/models/Planificacion';

@Component({
  selector: 'app-consulta-entrenamiento',
  templateUrl: './consulta-entrenamiento.component.html',
  styleUrls: ['./consulta-entrenamiento.component.css']
})
export class ConsultaEntrenamientoComponent implements OnInit {
  entrenamiento: any;
  fg: FormGroup;
  rol: string;
  planificaciones: Planificacion[];
  constructor(private servicioPlani: PlanificacionService, private entrenamientoServ: EntrenamientoService, private fb: FormBuilder) {
    this.entrenamiento = [];
    console.log(this.entrenamiento.length);



  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      fecha: [""],
      idPlani: [""],
      visible: [""],
    });


    this.rol = localStorage.getItem('rol');

    this.cargarPlanificaciones();
  }

  cargarPlanificaciones() {
    this.servicioPlani.getPlanificaciones().subscribe(
      {
        next: plani => { this.planificaciones = plani; console.log(this.planificaciones); },
        error: err => console.log(err)
      }
    )
  }


  consultarEntrenamiento() {
    this.entrenamientoServ.getEntrenamiento(this.fg.value.idPlani, this.fg.value.fecha).subscribe({
      next: entr => {
        this.entrenamiento = entr;
        console.log(this.entrenamiento);
        console.log(this.entrenamiento.entrenXPlanis[0].secciones);
      },
      error: err => { console.log(err); }
    })
  }

  hacerVisible() {
    this.entrenamientoServ.visibilidadEntrenamiento(this.entrenamiento.idPlanificacion, this.entrenamiento.entrenXPlanis[0].fecha, 1).subscribe({
      next: vis => this.entrenamiento.entrenXPlanis[0].visible = 1,
      error: err => console.log(err)
    })
  }

  hacerInvisible() {
    this.entrenamientoServ.visibilidadEntrenamiento(this.entrenamiento.idPlanificacion, this.entrenamiento.entrenXPlanis[0].fecha, 0).subscribe({
      next: vis => this.entrenamiento.entrenXPlanis[0].visible = 0,
      error: err => console.log(err)
    })

  }

}
