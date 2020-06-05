import { Wod } from "./Wod"

export class Seccion {
    tipo: string;
    comentarios: string;
    wods: Wod[];
    id: string;

    constructor(tipo: string, coment: string, wods: Wod[], idSeccion: string = "") {
        this.tipo = tipo;
        this.comentarios = coment;
        this.wods = wods;
        this.id = idSeccion;
    }
}


