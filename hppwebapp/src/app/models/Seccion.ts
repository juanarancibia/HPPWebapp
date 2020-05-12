import { Wod } from "./Wod"

export class Seccion {
    tipo: string;
    comentarios: string;
    wods: Wod[];

    constructor(tipo: string, coment: string, wods: Wod[]) {
        this.tipo = tipo;
        this.comentarios = coment;
        this.wods = wods;
    }
}


