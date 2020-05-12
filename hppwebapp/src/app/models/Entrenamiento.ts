import { Seccion } from "./Seccion";

export class Entrenamiento {
    planificacion: number;
    comentarios: string;
    visible: boolean;
    secciones: Seccion[];

    constructor(plani: number, coment: string, vis: boolean, secs: Seccion[]) {
        this.planificacion = plani;
        this.comentarios = coment;
        this.visible = vis;
        this.secciones = secs;
    }
}