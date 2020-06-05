import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entrenamiento } from 'src/app/models/Entrenamiento';
import { Planificacion } from 'src/app/models/Planificacion';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { Wod } from 'src/app/models/Wod';
import { Seccion } from 'src/app/models/Seccion';
import { SeccionService } from 'src/app/services/seccion.service';
import { WodService } from 'src/app/services/wod.service';

@Component({
  selector: 'app-modificar-entrenamiento',
  templateUrl: './modificar-entrenamiento.component.html',
  styleUrls: ['./modificar-entrenamiento.component.css']
})
export class ModificarEntrenamientoComponent implements OnInit {
  addMore: FormGroup;
  secs: FormArray;
  entrenamiento: Entrenamiento;
  planis: Planificacion[];
  entr: any = [];


  constructor(private fb: FormBuilder, private servicioEnt: EntrenamientoService, private servicioPlani: PlanificacionService, private servicioSeccion: SeccionService, private servicioWod: WodService) { }

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

  initSecciones() {
    console.log(this.addMore);
    return this.fb.group({
      tipo: ["", [Validators.required]],
      comentariosS: [""],
      idSeccion: [""],
      wods: this.fb.array([this.initWods()]),
    });
  }

  initWods() {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
      tipoScore: [""],
      comentariosW: [""],
      idTimer: [""],
      idWod: [""]
    });
  }

  cargarSeccion(sec) {
    console.log(sec.wods);
    var aux = this.fb.group({
      tipo: [sec.tipoSeccion.toString(), [Validators.required]],
      comentariosS: [sec.comentarios],
      idSeccion: [sec.idSeccion.toString()],
      wods: this.fb.array([]),
    });
    sec.wods.forEach(element => {
      var fa = aux.get("wods") as FormArray;
      fa.push(this.cargarWod(element));
    });
    console.log(aux);
    return aux;
  }

  cargarWod(wod) {
    return this.fb.group({
      descripcion: [wod.descripcion, [Validators.required]],
      tipoScore: [wod.tipoScore],
      comentariosW: [wod.comentarios],
      idTimer: [wod.idTimer],
      idWod: [wod.idWod.toString()]
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
    if (confirm("Eliminar el Wod?")) {
      this.servicioWod.deleteWod(this.addMore.get("fecha").value, this.addMore.get("planificacion").value, this.secciones().at(secIndex).value.idSeccion, this.wods(secIndex).at(wodIndex).value.idWod).subscribe({
        next: res => console.log(res),
        error: err => console.log(err)
      })
      this.wods(secIndex).removeAt(wodIndex);
    }
  }

  borrarSeccion(index: number) {
    if (confirm("Eliminar la Seccion?")) {
      this.servicioSeccion.deleteSeccion(this.addMore.get("fecha").value, this.addMore.get("planificacion").value, this.secciones().at(index).value.idSeccion).subscribe({
        next: res => console.log(res),
        error: err => console.log(err)
      })
      this.secciones().removeAt(index);
    }
  }

  getEntrenamiento() {
    this.servicioEnt.getEntrenamiento(this.addMore.value.planificacion, this.addMore.value.fecha).subscribe({
      next: resultado => {
        this.entr = resultado;
        console.log(resultado);
        console.log(this.entr.entrenXPlanis[0].comentarios);
        this.addMore.controls['comentariosP'].setValue(this.entr.entrenXPlanis[0].comentarios);
        this.addMore.controls['visible'].setValue(this.entr.entrenXPlanis[0].visible.toString());
        this.secciones().clear();
        this.entr.entrenXPlanis[0].secciones.forEach(seccion => {
          this.secciones().push(this.cargarSeccion(seccion));
        });
        console.log(this.entr.entrenXPlanis);
        console.log(this.addMore.value);

      },
      error: err => console.log(err)
    })
  }

  modificarEntrenamiento() {

    let wods: Wod[];
    let secs: Seccion[] = [];
    this.addMore.value.secciones.forEach(seccion => {

      wods = [];
      seccion.wods.forEach(wod => {
        wods.push(new Wod(wod.descripcion, wod.tipoScore, wod.comentariosW, wod.idTimer, wod.idWod))
      });
      console.log(secs)
      secs.push(new Seccion(
        seccion.tipo,
        seccion.comentariosS,
        wods,
        seccion.idSeccion
      ));
    });
    this.entrenamiento = new Entrenamiento(this.addMore.value.planificacion, this.addMore.value.fecha, this.addMore.value.comentariosP, this.addMore.value.visible, secs);
    console.log(JSON.stringify(this.entrenamiento));
    this.servicioEnt.modificarEntrenamiento(this.entrenamiento).subscribe({
      next: resultado => { console.log(resultado); resultado.name == "SequelizeUniqueConstraintError" ? window.alert("Ya existe un entrenamiento en esta planificacion para este día") : window.alert("Se cargo el entrenamiento con éxito") },
      error: err => window.alert("Hubo un error al cargar el entrenamiento " + err)
    });
  }
}
