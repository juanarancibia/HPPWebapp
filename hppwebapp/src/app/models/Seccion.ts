import { Wod } from "./Wod"

export class Seccion {
    tipoSeccion: string;
    comentarios: string;
    wods: Wod[];

    constructor(tipo: string, coment: string, wods: Wod[]) {
        this.tipoSeccion = tipo;
        this.comentarios = coment;
        this.wods = wods;
    }
}


