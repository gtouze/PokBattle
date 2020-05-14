export class Capacite {
    idCapacite: number;
    nom: string;
    puissance: number;
    precisionCapacite: number;
    type: string;

    constructor(idCapacite: number, nom: string, puissance: number, precisionCapacite: number, type: string) {
        this.idCapacite = idCapacite;
        this.nom = nom;
        this.puissance = puissance;
        this.precisionCapacite = precisionCapacite;
        this.type = type;
    }
}
