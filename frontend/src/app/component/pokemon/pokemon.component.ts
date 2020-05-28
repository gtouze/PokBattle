import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/_webservices/pokemon.webservice';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() team: any;

  pokemon: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonById(this.team.pokemon).subscribe((poke: Pokemon) => {
      this.pokemon = poke;
    }, (err) => {
      console.error(err);
    });
  }

}
