import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() clickCapacite1 = new EventEmitter<Capacite>();
  @Output() clickCapacite2 = new EventEmitter<Capacite>();

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

  clickCapa1() {
    this.clickCapacite1.emit(this.capacite1);
  }

  clickCapa2() {
    this.clickCapacite2.emit(this.capacite2);
  }

}
