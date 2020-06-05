import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/_webservices/pokemon.webservice';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Capacite } from 'src/app/models/capacite.model';
import { Equipe } from 'src/app/models/equipe.model';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.css']
})
export class VersusComponent implements OnInit {

  @Input() pseudo1: string;
  @Input() equipe1: any[];
  @Input() pseudo2: string;
  @Input() equipe2: any[];

  replacedPokemon1 = false;
  replacedPokemon2 = false;
  changePokemon1 = false;
  changePokemon2 = false;
  commencerTour = false;
  equipe1Survi = true;
  equipe2Survi = true;
  combatInfo1 = [];
  combatInfo2 = [];
  actionJ1: Capacite;
  actionJ2: Capacite;
  premierJoueur: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    for (const team of this.equipe1) {
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo1.push({
          pvActuel: poke[0].pv * 4,
          equipe: team,
          pokemon: poke[0]
        });
      }, (err) => {
        console.error(err);
      });
    }

    for (const team of this.equipe2) {
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo2.push({
          pvActuel: poke[0].pv * 4,
          equipe: team,
          pokemon: poke[0]
        });
      }, (err) => {
        console.error(err);
      });
    }
  }

  clickCapa(capacite: Capacite, joueur: number) {
    if (joueur === 1) {
      this.actionJ1 = capacite;
    } else {
      this.actionJ2 = capacite;
    }

    if (this.commencerTour) {
      // Définit le joueur qui commence à jouer selon la vitesse de son pokemon
      if (this.combatInfo1[0].pokemon.vit > this.combatInfo2[0].pokemon.vit) {
        this.premierJoueur = 1;
      } else if (this.combatInfo1[0].pokemon.vit < this.combatInfo2[0].pokemon.vit) {
        this.premierJoueur = 2;
      } else {
        this.premierJoueur = Math.round(Math.random() * Math.floor(2));
      }

      if (this.premierJoueur === 1) {
        this.effectuerAttaqueJ1(this.actionJ1);
        if (this.combatInfo2[0].pvActuel > 0) {
          this.effectuerAttaqueJ2(this.actionJ2);
          if (this.combatInfo1[0].pvActuel <= 0) {
            this.pokemonKoJ1();
          }
        } else {
          this.pokemonKoJ2();
        }
      } else {
        this.effectuerAttaqueJ2(this.actionJ2);
        if (this.combatInfo1[0].pvActuel > 0) {
          this.effectuerAttaqueJ1(this.actionJ1);
          if (this.combatInfo2[0].pvActuel <= 0) {
            this.pokemonKoJ2();
          }
        } else {
          this.pokemonKoJ1();
        }
      }
      this.commencerTour = false;
      this.replacedPokemon1 = false;
      this.replacedPokemon2 = false;
    } else {
      this.commencerTour = true;
    }
  }

  isPartiePasFini() {
    // vérifier si match fini
    this.equipe1Survi = this.combatInfo1.length > 0;
    this.equipe2Survi = this.combatInfo2.length > 0;

    return this.equipe1Survi && this.equipe2Survi;
  }

  pokemonKoJ1() {
    console.log('KO J1');
    if (this.isPartiePasFini()) {
      this.combatInfo1.shift();
      this.isPartiePasFini();
    }
  }

  pokemonKoJ2() {
    console.log('KO J2');
    if (this.isPartiePasFini()) {
      this.combatInfo2.shift();
      this.isPartiePasFini();
    }
  }

  remplacerPokemon1(infoCbt: any) {
    this.replacedPokemon1 = true;
    this.commencerTour = true;
    let max = 1;
    while (this.combatInfo1.length > max) {
      this.combatInfo1.push(this.combatInfo1.shift());
      max++;
      if (this.combatInfo1[0] === infoCbt) {
        break;
      }
    }
  }

  remplacerPokemon2(infoCbt: any) {
    this.replacedPokemon2 = true;
    this.commencerTour = true;
    let max = 1;
    while (this.combatInfo2.length > max) {
      this.combatInfo2.push(this.combatInfo2.shift());
      max++;
      if (this.combatInfo2[0] === infoCbt) {
        break;
      }
    }
  }

  effectuerAttaqueJ1(capacite: Capacite) {
    if (!this.replacedPokemon1) {
      if (this.precisionSucces(capacite.precisionCapacite)) {
        console.log('Attaque ' + capacite.nom + ' de ' + this.combatInfo1[0].pokemon.nom + ' inflige '  + this.calculDegats(
          this.combatInfo1[0].pokemon.atk, this.combatInfo2[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo2[0].pokemon.type)) + ' multType ' +
          this.calculTypeMult(capacite.type, this.combatInfo2[0].pokemon.type));
        this.combatInfo2[0].pvActuel = this.combatInfo2[0].pvActuel - this.calculDegats(
          this.combatInfo1[0].pokemon.atk, this.combatInfo2[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo2[0].pokemon.type));
      } else {
        console.log('la capacité du j1 a loupé');
      }
    }
  }

  effectuerAttaqueJ2(capacite: Capacite) {
    if (!this.replacedPokemon2) {
      if (this.precisionSucces(capacite.precisionCapacite)) {
        console.log('Attaque ' + capacite.nom + ' de ' + this.combatInfo2[0].pokemon.nom + ' inflige '  + this.calculDegats(
          this.combatInfo2[0].pokemon.atk, this.combatInfo1[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo1[0].pokemon.type)) + ' multType: ' +
          this.calculTypeMult(capacite.type, this.combatInfo1[0].pokemon.type));
        this.combatInfo1[0].pvActuel = this.combatInfo1[0].pvActuel - this.calculDegats(
          this.combatInfo2[0].pokemon.atk, this.combatInfo1[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo1[0].pokemon.type));
      } else {
        console.log('la capacité du j2 a loupé');
      }
    }
  }

  calculTypeMult(typeAttaque: string, typeDefenseur: string) {
    switch (typeAttaque) {
      case 'Normal':
        return 1;
      case 'Feu':
        if (typeDefenseur === 'Plante') {
          return 2;
        } else {
          return 0.5;
        }
      case 'Eau':
        if (typeDefenseur === 'Feu') {
          return 2;
        } else {
          return 0.5;
        }
      case 'Plante':
        if (typeDefenseur === 'Eau') {
          return 2;
        } else {
          return 0.5;
        }
      default:
        console.log('Type d\'attaque inconnu: ' + typeAttaque);
    }
  }

  precisionSucces(precision: number) {
    return Math.round(Math.random() * Math.round(100)) <= precision;
  }

  calculDegats(atk: number, def: number, puissance: number, typeMult: number) {
    return Math.round(atk / def * puissance * typeMult);
  }

  toggleChangePokemon1() {
    this.changePokemon1 = !this.changePokemon1;
  }

  toggleChangePokemon2() {
    this.changePokemon2 = !this.changePokemon2;
  }

  refresh(): void {
    window.location.reload();
  }

}
