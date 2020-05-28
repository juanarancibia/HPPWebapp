import { Component, OnInit } from '@angular/core';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-entrenamiento-diario',
  templateUrl: './entrenamiento-diario.component.html',
  styleUrls: ['./entrenamiento-diario.component.css']
})
export class EntrenamientoDiarioComponent implements OnInit {
  panelOpenState = false;
  entrenamiento: any;
  form: FormGroup;
  tipoScoreCarga: string;
  idWod: string;
  idSeccion: string;

  closeResult = '';

  constructor(private entrenamientoServ: EntrenamientoService, private modalService: NgbModal, private fb: FormBuilder, private scoreService: ScoreService) {
    this.entrenamiento = { entrenXPlanis: [[]] };
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      scoreCargado: [""]
    });

    this.entrenamientoServ.getEntrenamiento("1").subscribe({
      next: entr => {
        this.entrenamiento = entr;
        console.log(this.entrenamiento);
      },
      error: err => { console.log(err); }
    });
  }

  open(content, tipoScore, idWod, idSecicon) {
    this.idWod = idWod;
    this.idSeccion = idSecicon;
    console.log(this.idWod + "    " + this.idSeccion);
    this.tipoScoreCarga = tipoScore;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  guardar(modal) {
    modal.close('Guardo');
    this.scoreService.cargarScore(this.idSeccion, this.idWod, this.form.value.scoreCargado, this.entrenamiento.entrenXPlanis[0].fecha).subscribe({
      next: res => console.log(res),
      error: err => console.error(err),
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

}
