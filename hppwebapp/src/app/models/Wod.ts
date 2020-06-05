export class Wod {
    idWod: string;
    descripcion: string;
    tipoScore: string;
    comentarios: string;
    idTimer: string;

    constructor(desc: string, tipo: string, coment: string, timer: string, wod: string, idWod = "") {
        this.idWod = wod;
        this.descripcion = desc;
        this.tipoScore = tipo;
        this.comentarios = coment;
        this.idTimer = timer;
    }
}