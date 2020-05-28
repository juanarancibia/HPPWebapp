import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScoreService } from 'src/app/services/score.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { Planificacion } from 'src/app/models/Planificacion';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Wod } from 'src/app/models/Wod';
import { WodService } from 'src/app/services/wod.service';

@Component({
  selector: 'app-consulta-score',
  templateUrl: './consulta-score.component.html',
  styleUrls: ['./consulta-score.component.css']
})
export class ConsultaScoreComponent implements OnInit {
  form: FormGroup;
  rol: string;
  planificaciones: Planificacion[];
  scores: any;
  dataSource: any = [];
  scoreOrd: boolean;
  atletaOrd: boolean;
  tipoOrd: boolean;
  closeResult: string = "";
  wod: any = [];
  filtroWod: boolean = false;
  dataSourceFiltradoWod: any = [];

  constructor(private fb: FormBuilder, private wodService: WodService, private modalService: NgbModal, private scoreServ: ScoreService, private servicioPlani: PlanificacionService) { }

  ngOnInit(): void {
    this.scores = [];
    this.scoreOrd = false;
    this.atletaOrd = false;
    this.tipoOrd = false;
    this.form = this.fb.group({
      email: [""],
      fecha: [""],
      idPlani: [""],
    });

    this.rol = localStorage.getItem('rol');
    this.cargarPlanificaciones();
  }

  consultarScores() {
    this.scoreServ.consultarScoresEntrenamiento(this.form.value.fecha, this.form.value.idPlani).subscribe({
      next: scores => { this.scores = scores; this.dataSource = scores; console.log(scores) },
      error: err => console.error(err)
    })
  }

  cargarPlanificaciones() {
    this.servicioPlani.getPlanificaciones().subscribe(
      {
        next: plani => { this.planificaciones = plani },
        error: err => console.log(err)
      }
    )
  }

  ordenarScores() {
    console.log(this.scoreOrd);

    if (this.scoreOrd) {
      this.scores.sort(function (a, b) {
        return parseInt(a.score) > parseInt(b.score);
      });
    } else {
      this.scores.sort(function (a, b) {
        return parseInt(a.score) < parseInt(b.score);
      });
    }
    this.scoreOrd = !this.scoreOrd;
  }

  ordenarAtletas() {
    if (this.atletaOrd) {
      this.scores.sort(function (a, b) {
        return a.usuario.nombre > b.usuario.nombre;
      });
    } else {
      this.scores.sort(function (a, b) {
        return a.usuario.nombre < b.usuario.nombre;
      });
    }
    this.atletaOrd = !this.atletaOrd;
  }

  ordenarTipo() {
    if (this.tipoOrd) {
      this.scores.sort(function (a, b) {
        return a.wod.tipoScore > b.wod.tipoScore;
      });
    } else {
      this.scores.sort(function (a, b) {
        return a.wod.tipoScore < b.wod.tipoScore;
      });
    }
    this.tipoOrd = !this.tipoOrd;
  }

  filtrarSexo(value: string) {
    if (this.filtroWod) {
      this.scores = this.dataSourceFiltradoWod;
      if (value != "") {
        this.scores = this.dataSourceFiltradoWod.filter(score => score.usuario.sexo == value);
      }
    } else {
      this.scores = this.dataSource;
      if (value != "") {
        this.scores = this.dataSource.filter(score => score.usuario.sexo == value);
      }
    }

  }

  filtrarBusqueda() {
    let busq = <HTMLInputElement>document.getElementById("buscador");
    if (this.filtroWod) {
      this.scores = this.dataSourceFiltradoWod;
      if (busq.value != "") {
        this.scores = this.dataSourceFiltradoWod.filter(score => ((score.usuario.nombre.toLowerCase() + " " + score.usuario.apellido.toLowerCase())).indexOf(busq.value.toLowerCase()) >= 0);
      }
    } else {
      this.scores = this.dataSource;
      if (busq.value != "") {
        this.scores = this.dataSource.filter(score => ((score.usuario.nombre.toLowerCase() + " " + score.usuario.apellido.toLowerCase())).indexOf(busq.value.toLowerCase()) >= 0);
      }
    }
  }

  verWod(content, fecha, idPlani, idSeccion, idWod) {
    this.wodService.getWod(fecha, idPlani, idSeccion, idWod).subscribe({
      next: res => { this.wod = res; console.log(res) },
      error: err => console.log(err)
    })

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

  filtrarWod() {
    this.dataSourceFiltradoWod = this.scores = this.dataSource.filter(score => score.idWod == this.wod.idWod && score.idSeccion == this.wod.idSeccion);
    document.getElementById("btnCerrar").click();
    this.filtroWod = true;
  }

  reestablecer() {
    this.scores = this.dataSource;
    this.dataSourceFiltradoWod = [];
    this.filtroWod = false;
  }

}
