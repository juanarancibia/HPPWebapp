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
        this.entrenamiento = entr;
      },
      error: err => { console.log(err); }
    })
  }

}
