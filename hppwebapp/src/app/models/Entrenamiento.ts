import { Seccion } from "./Seccion";

export class Entrenamiento {
    idPlani: number;
    comentarios: string;
    visible: boolean;
    secciones: Seccion[];
    fecha: string;
    constructor(plani: number, fecha: string, coment: string, vis: boolean, secs: Seccion[]) {
        this.idPlani = plani;
        this.fecha = fecha;
        this.comentarios = coment;
        this.visible = vis;
        this.secciones = secs;
    }
}