export class Equipe {
    idEquipe: number;
    nomEquipe: string;
    dresseur: number;
    pokemon: number;
    capacite1: number;
    capacite2: number;

    constructor(idEquipe: number, nomEquipe: string, dresseur: number, pokemon: number, capacite1: number, capacite2: number) {
        this.idEquipe = idEquipe;
        this.nomEquipe = nomEquipe;
        this.dresseur = dresseur;
        this.pokemon = pokemon;
        this.capacite1 = capacite1;
        this.capacite2 = capacite2;
    }
}
