import { Component, OnInit, ViewChild } from '@angular/core';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { Planificacion } from 'src/app/models/Planificacion';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ScoreService } from 'src/app/services/score.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-entrenamiento',
  templateUrl: './consulta-entrenamiento.component.html',
  styleUrls: ['./consulta-entrenamiento.component.css']
})
export class ConsultaEntrenamientoComponent implements OnInit {
  entrenamiento: any;
  fg: FormGroup;
  planificaciones: Planificacion[];
  rol: string;
  scores: any = [];
  scoreOrd: boolean;
  atletaOrd: boolean;
  tipoScore: string;
  dataSource: any = [];

  closeResult = '';

  constructor(private servicioPlani: PlanificacionService, private modalService: NgbModal, private scoreService: ScoreService, private entrenamientoServ: EntrenamientoService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.tipoScore = '';
    this.scoreOrd = false;
    this.atletaOrd = false;
    this.scores = [];
    this.entrenamiento = { entrenXPlanis: [[]], nombre: '' };
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
        next: plani => { this.planificaciones = plani },
        error: err => console.log(err)
      }
    )
  }


  consultarEntrenamiento() {
    this.entrenamientoServ.getEntrenamiento(this.fg.value.idPlani, this.fg.value.fecha).subscribe({
      next: entr => {
        this.entrenamiento = entr;
        console.log(this.entrenamiento);
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

  open(content, idPlani, fecha, idWod, idSeccion, tipoScore) {
    this.tipoScore = tipoScore;
    this.scoreService.getScoreWod(fecha, idPlani, idSeccion, idWod).subscribe({
      next: res => { this.scores = res; this.dataSource = this.scores; console.log(res) },
      error: err => console.error(err),
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ordenarScores() {
    console.log(this.scoreOrd);
    var tipo = this.tipoScore;
    if (this.scoreOrd) {
      this.dataSource.sort(function (a, b) {
        if (tipo == "Tiempo") {
          return parseInt((a.score.split(':')[0]) + a.score.split(':')[1] + a.score.split(':')[2]) > parseInt((b.score.split(':')[0]) + b.score.split(':')[1] + b.score.split(':')[2])
        }
        return parseInt(a.score) > parseInt(b.score);
      });
    } else {
      this.dataSource.sort(function (a, b) {
        if (tipo == "Tiempo") {
          return parseInt((a.score.split(':')[0]) + a.score.split(':')[1] + a.score.split(':')[2]) < parseInt((b.score.split(':')[0]) + b.score.split(':')[1] + b.score.split(':')[2])
        }
        return parseInt(a.score) < parseInt(b.score);
      });
    }
    this.scoreOrd = !this.scoreOrd;
  }

  ordenarAtletas() {
    if (this.atletaOrd) {
      this.dataSource.sort(function (a, b) {
        return a.usuario.nombre > b.usuario.nombre;
      });
    } else {
      this.dataSource.sort(function (a, b) {
        return a.usuario.nombre < b.usuario.nombre;
      });
    }
    this.atletaOrd = !this.atletaOrd;
  }

  filtrarSexo(value: string) {
    this.dataSource = this.scores;
    if (value != "") {
      this.dataSource = this.scores.filter(score => score.usuario.sexo == value);
    }
  }

  filtrarBusqueda() {
    let busq = <HTMLInputElement>document.getElementById("buscador");
    this.dataSource = this.scores;
    if (busq.value != "") {
      this.dataSource = this.scores.filter(score => ((score.usuario.nombre.toLowerCase() + " " + score.usuario.apellido.toLowerCase())).indexOf(busq.value.toLowerCase()) >= 0);
    }
  }

  eliminarEntrenamiento() {
    if (confirm("Eliminar entrenamiento?")) {
      this.entrenamientoServ.deleteEntrenamiento(this.fg.value.idPlani, this.fg.value.fecha).subscribe({
        next: res => console.log(res),
        error: err => console.log(err)
      });
      this.fg.get("idPlani").setValue("");
      this.fg.get("fecha").setValue("");
      this.entrenamiento = { entrenXPlanis: [[]], nombre: '' };
    }
  }

}
