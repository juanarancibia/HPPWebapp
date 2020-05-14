import { Component, OnInit } from '@angular/core';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-entrenamiento-diario',
  templateUrl: './entrenamiento-diario.component.html',
  styleUrls: ['./entrenamiento-diario.component.css']
})
export class EntrenamientoDiarioComponent implements OnInit {
  panelOpenState = false;
  entrenamiento: any;
  constructor(private entrenamientoServ: EntrenamientoService) {
    this.entrenamiento = [];
  }

  ngOnInit(): void {
    this.entrenamientoServ.getEntrenamiento("1").subscribe({
      next: entr => {
        this.entrenamiento = entr; this.entrenamiento.entrenXPlanis[0].comentarios.replace(/\n/g, "<br />");
        console.log(this.entrenamiento);
        this.entrenamiento.entrenXPlanis[0].secciones.forEach(seccion => {

          seccion.comentarios.replace(/\n/g, "<br />");
          seccion.wods.forEach(wod => {

            wod.descripcion.replace('\n', '<br>')
            wod.comentarios.replace('\n', '<br>')
            console.log(wod.descripcion);
          });
        });
        console.log(this.entrenamiento);
      },
      error: err => { console.log(err); }
    })
  }

}
