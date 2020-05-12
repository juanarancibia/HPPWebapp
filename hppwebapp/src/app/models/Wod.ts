export class Wod {
    descripcion: string;
    tipoScore: string;
    comentarios: string;
    idTimer: string;

    constructor(desc: string, tipo: string, coment: string, timer: string) {
        this.descripcion = desc;
        this.tipoScore = tipo;
        this.comentarios = coment;
        this.idTimer = timer;
    }
}