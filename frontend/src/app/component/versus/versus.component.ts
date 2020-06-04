import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/_webservices/pokemon.webservice';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Capacite } from 'src/app/models/capacite.model';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.css']
})
export class VersusComponent implements OnInit {

  @Input() equipe1: any;
  @Input() equipe2: any;

  combatInfo1 = [];
  combatInfo2 = [];

  equipe1Survi = true;
  equipe2Survi = true;

  joueurActuel: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    console.log(this.equipe1);
    console.log(this.equipe2);

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
    console.log('remplissage: combatInfo1');
    for (const team of this.equipe1) {
      console.log(team);
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo1.push({
          pvActuel: poke[0].pv,
          equipe: this.equipe1,
          pokemon: poke[0]
        });
      }, (err) => {
        console.error(err);
      });
    }

    console.log('remplissage: combatInfo2');
    for (const team of this.equipe2) {
      console.log(team);
      this.pokemonService.getPokemonById(team.pokemon).subscribe((poke: Pokemon) => {
        this.combatInfo1.push({
          pvActuel: poke[0].pv,
          equipe: this.equipe2,
          pokemon: poke[0]
        });
      }, (err) => {
        console.error(err);
      });
    }

    // Définit le joueur qui commence à jouer selon la vitesse des premiers pokemons
    console.log(this.combatInfo1[0].pokemon);
    console.log(this.combatInfo2[0].pokemon);
    if (this.combatInfo1[0].pokemon.vit > this.combatInfo2[0].pokemon.vit) {
      this.joueurActuel = 1;
    } else if (this.combatInfo1[0].pokemon.vit < this.combatInfo2[0].pokemon.vit) {
      this.joueurActuel = 2;
    } else {
      this.joueurActuel = Math.floor(Math.random() * Math.floor(2));
    }

  }

  finAction() {
    // vérifier si match fini
    for (const current of this.combatInfo1) {
      this.equipe1Survi = this.equipe1Survi && current.pvActuel <= 0;
    }
    for (const current of this.combatInfo2) {
      this.equipe2Survi = this.equipe2Survi && current.pvActuel <= 0;
    }

    // changement auto pkm
    if (this.joueurActuel === 1) {
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
    }

    // Le joueur actuel est maintenant l'autre
    if (this.joueurActuel === 1) {
      this.joueurActuel = 2;
    } else {
      this.joueurActuel = 1;
    }
  }

  clickCapa(capacite: Capacite) {
    if (this.joueurActuel === 1) {
      if (this.precisionSucces(capacite.precisionCapacite)) {
        this.combatInfo2[0].pv = this.combatInfo2[0].pv - this.calculDegats(
          this.combatInfo2[0].pokemon.atk, this.combatInfo1[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo1[0].pokemon.type));
      }
    } else {
      if (this.precisionSucces(capacite.precisionCapacite)) {
        this.combatInfo1[0].pv = this.combatInfo1[0].pv - this.calculDegats(
          this.combatInfo1[0].pokemon.atk, this.combatInfo2[0].pokemon.def, capacite.puissance,
          this.calculTypeMult(capacite.type, this.combatInfo2[0].pokemon.type));
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
    return Math.floor(Math.random() * Math.floor(100)) <= precision;
  }

  calculDegats(atk: number, def: number, puissance: number, typeMult: number) {
    console.log('Dégats infligés: ' + (atk / def * puissance * typeMult));
    return (atk / def * puissance * typeMult);
  }
}
