import { Component, OnInit } from '@angular/core';
import { WodService } from 'src/app/services/wod.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-mis-scores',
  templateUrl: './mis-scores.component.html',
  styleUrls: ['./mis-scores.component.css']
})
export class MisScoresComponent implements OnInit {

  closeResult: string = '';
  wod: any = [];
  dataSource: any = [];
  scores: any = [];



  constructor(private wodService: WodService, private modalService: NgbModal, private scoreServ: ScoreService) { }

  ngOnInit(): void {
    this.cargarScores();
  }

  cargarScores() {
    this.scoreServ.getScoreAtleta().subscribe({
      next: res => { this.scores = res; this.dataSource = res; console.log(res) },
      error: err => console.log(err)
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

  filtrarFecha(value) {
    this.dataSource = this.scores;
    this.dataSource = this.scores.filter(score => score.fecha == value);
  }

  reset() {
    this.dataSource = this.scores;
    var date = <HTMLInputElement>document.getElementById("date");
    date.value = "";
  }
}
