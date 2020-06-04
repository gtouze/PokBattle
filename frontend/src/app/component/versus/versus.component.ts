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

  @Input() equipe1: any[];
  @Input() equipe2: any[];

  combatInfo1 = [];
  combatInfo2 = [];
  commencerTour = false;

  equipe1Survi = true;
  equipe2Survi = true;

  actionJ1: Capacite;
  actionJ2: Capacite;
  premierJoueur: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    // XX définir un objet qui traque la vie des pokemons en combat
    // XX récupérer les infos des pokemons
    //    gestion tour par tour                       <- partie front à gérer
    // XX gestion attaque
    //    gestion changement de pokemon
    // XX definir joueurActuel dans ngInit

    /*
      combatInfo1: [{
        pvActuel: 100,     <- initialisé à la valeur pokemon.pv (max pv du pokemon)
        equipe: Equipe,     <- récupération de l'objet passé en param au composant app-pokemon
        pokemon: Pokemon    <- récupération des statistiques depuis ici pour calcul dmg
      },
      {
        pvActuel: 100,
        equipe: Equipe,
        pokemon: Pokemon
      },
      {
        pvActuel: 100,
        equipe: Equipe,
        pokemon: Pokemon
      }]
    */

    let i = 0;
    console.log('remplissage: combatInfo1');
    for (const team of this.equipe1) {
      console.log(team);
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo1.push({
          pvActuel: poke[0].pv * 4,
          equipe: this.equipe1[i],
          pokemon: poke[0]
        });
        i++;
      }, (err) => {
        console.error(err);
      });
    }

    i = 0;
    console.log('remplissage: combatInfo2');
    for (const team of this.equipe2) {
      console.log(team);
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo2.push({
          pvActuel: poke[0].pv * 4,
          equipe: this.equipe2[i],
          pokemon: poke[0]
        });
        i++;
      }, (err) => {
        console.error(err);
      });
    }
  }

  finAction() {
    this.commencerTour = false;

    // vérifier si match fini
    for (const current of this.combatInfo1) {
      this.equipe1Survi = this.equipe1Survi && current.pvActuel <= 0;
    }
    for (const current of this.combatInfo2) {
      this.equipe2Survi = this.equipe2Survi && current.pvActuel <= 0;
    }

    // changement auto pkm
    /*if (this.joueurActuel === 1) {
      let max = 1;
      while (this.combatInfo1[0].pvActuel <= 0 && this.combatInfo1.length > max) {
        this.combatInfo1.push(this.combatInfo1.shift());
        max++;
      }
    } else {
      let max = 1;
      while (this.combatInfo2[0].pvActuel <= 0 && this.combatInfo2.length > max) {
        this.combatInfo2.push(this.combatInfo2.shift());
        max++;
      }
    }*/
  }

  clickCapa(capacite: Capacite, joueur: number) {
    if (joueur === 1) {
      this.actionJ1 = capacite;
    } else {
      this.actionJ2 = capacite;
    }

    if (this.commencerTour) {
      // Définit le joueur qui commence à jouer selon la vitesse de son pokemon
      console.log(this.combatInfo1[0].pokemon);
      if (this.combatInfo1[0].pokemon.vit > this.combatInfo2[0].pokemon.vit) {
        this.premierJoueur = 1;
      } else if (this.combatInfo1[0].pokemon.vit < this.combatInfo2[0].pokemon.vit) {
        this.premierJoueur = 2;
      } else {
        this.premierJoueur = Math.round(Math.random() * Math.floor(2));
      }

      if (this.premierJoueur === 1) {
        this.effectuerAttaqueJ1(this.actionJ1);
        this.effectuerAttaqueJ2(this.actionJ2);
      } else {
        this.effectuerAttaqueJ2(this.actionJ2);
        this.effectuerAttaqueJ1(this.actionJ1);
      }
      console.log(this.combatInfo1);
      console.log(this.combatInfo2);
      this.finAction();
    } else {
      this.commencerTour = true;
    }
  }

  effectuerAttaqueJ1(capacite: Capacite) {
    if (this.precisionSucces(capacite.precisionCapacite)) {
      this.combatInfo2[0].pvActuel = this.combatInfo2[0].pvActuel - this.calculDegats(
        this.combatInfo2[0].pokemon.atk, this.combatInfo1[0].pokemon.def, capacite.puissance,
        this.calculTypeMult(capacite.type, this.combatInfo1[0].pokemon.type));
    } else {
      console.log('la capacité du j1 a loupé');
    }
  }

  effectuerAttaqueJ2(capacite: Capacite) {
    if (this.precisionSucces(capacite.precisionCapacite)) {
      this.combatInfo1[0].pvActuel = this.combatInfo1[0].pvActuel - this.calculDegats(
        this.combatInfo1[0].pokemon.atk, this.combatInfo2[0].pokemon.def, capacite.puissance,
        this.calculTypeMult(capacite.type, this.combatInfo2[0].pokemon.type));
    } else {
      console.log('la capacité du j2 a loupé');
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
    console.log('Dégats infligés: ' + Math.round(atk / def * puissance * typeMult));
    return Math.round(atk / def * puissance * typeMult);
  }

  log(val) { console.log(val); }
}
