import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { groupBy } from "rxjs/internal/operators/groupBy";
import { Entrenamiento } from "../../models/Entrenamiento"
import { Seccion } from "../../models/Seccion"
import { Wod } from "../../models/Wod"
import { Planificacion } from "../../models/Planificacion"
import { EntrenamientoService } from "../../services/entrenamiento.service"
import { PlanificacionService } from "../../services/planificacion.service"



@Component({
  selector: "app-carga-entrenamiento",
  templateUrl: "./carga-entrenamiento.component.html",
  styleUrls: ["./carga-entrenamiento.component.css"],
})
export class CargaEntrenamientoComponent implements OnInit {
  addMore: FormGroup;
  secs: FormArray;
  entrenamiento: Entrenamiento;
  planis: Planificacion[];


  constructor(private fb: FormBuilder, private servicioEnt: EntrenamientoService, private servicioPlani: PlanificacionService) { }

  ngOnInit(): void {
    this.addMore = this.fb.group({
      fecha: [""],
      planificacion: ["", [Validators.required]],
      comentariosP: [""],
      visible: ["", [Validators.required]],
      secciones: this.fb.array([this.initSecciones()]),
    });


    this.cargarPlanifiaciones();
  }

  cargarPlanifiaciones() {
    this.servicioPlani.getPlanificaciones().subscribe(
      {
        next: planificacion => { this.planis = planificacion; console.log(this.planis) },
        error: err => console.log(err)
      }
    )

  }

  planisDOM(data) {
    data.resultado.forEach(plani => {
      document.getElementById("selectPlanis").innerHTML += `<option value="${plani.idPlanificacion}">${plani.nombre}</option>`
    })
  }


  initSecciones() {
    console.log(this.addMore);
    return this.fb.group({
      tipo: ["", [Validators.required]],
      comentariosS: [""],
      wods: this.fb.array([this.initWods()]),
    });
  }

  initWods() {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
      tipoScore: [""],
      comentariosW: [""],
      idTimer: [""],
    });
  }

  secciones(): FormArray {
    return this.addMore.get("secciones") as FormArray;
  }

  agregarSeccion() {
    console.log(this.secciones);
    this.secciones().push(this.initSecciones());
  }

  wods(secIndex: number): FormArray {
    return this.secciones().at(secIndex).get("wods") as FormArray;
  }

  agregarWod(secIndex: number) {
    this.wods(secIndex).push(this.initWods());
  }

  borrarWod(secIndex: number, wodIndex: number) {
    this.wods(secIndex).removeAt(wodIndex);
  }

  borrarSeccion(index: number) {
    this.secciones().removeAt(index);
  }

  cargarEntrenamiento() {

    let wods: Wod[];
    let secs: Seccion[] = [];
    this.addMore.value.secciones.forEach(seccion => {

      wods = [];
      seccion.wods.forEach(wod => {
        wods.push(new Wod(wod.descripcion, wod.tipoScore, wod.comentariosW, wod.idTimer, ""))
      });
      console.log(secs)
      secs.push(new Seccion(
        seccion.tipo,
        seccion.comentariosS,
        wods
      ));
    });
    this.entrenamiento = new Entrenamiento(this.addMore.value.planificacion, this.addMore.value.fecha, this.addMore.value.comentariosP, this.addMore.value.visible, secs);
    console.log(JSON.stringify(this.entrenamiento));
    this.servicioEnt.cargarEntrenamiento(this.entrenamiento).subscribe({
      next: resultado => { console.log(resultado); resultado.name == "SequelizeUniqueConstraintError" ? window.alert("Ya existe un entrenamiento en esta planificacion para este día") : window.alert("Se cargo el entrenamiento con éxito") },
      error: err => window.alert("Hubo un error al cargar el entrenamiento " + err)
    });
  }
}
