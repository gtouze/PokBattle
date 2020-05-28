import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/_webservices/pokemon.webservice';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Capacite } from 'src/app/models/capacite.model';
import { CapaciteService } from 'src/app/_webservices/capacite.webservice';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() team: any;

  pokemon: Pokemon;
  capacite1: Capacite;
  capacite2: Capacite;

  constructor(private pokemonService: PokemonService, private capaciteService: CapaciteService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonById(this.team.pokemon).subscribe((poke: Pokemon) => {
      this.pokemon = poke[0];
    }, (err) => {
      console.error(err);
    });
    this.capaciteService.getCapaciteById(this.team.capacite1).subscribe((capa: Capacite) => {
      this.capacite1 = capa[0];
    }, (err) => {
      console.error(err);
    });
    if (this.team.capacite2) {
      this.capaciteService.getCapaciteById(this.team.capacite2).subscribe((capa: Capacite) => {
        this.capacite2 = capa[0];
      }, (err) => {
        console.error(err);
      });
    }
  }

}
