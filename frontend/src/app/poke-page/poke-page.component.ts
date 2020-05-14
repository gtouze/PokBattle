import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../_services/pokemon.services';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '../classes/pokemon';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-poke-page',
  templateUrl: './poke-page.component.html',
  styleUrls: ['./poke-page.component.css']
})
export class PokePageComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  allPokemons: Pokemon[];
  dataSource: MatTableDataSource<Pokemon>;
  displayedColumns: string[] = ['idPokemon', 'nom', 'type', 'pv', 'atk', 'def', 'vit'];
  selectedPoke: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons() {
    this.pokemonService.getAllPokemon().subscribe((pokemons: Pokemon[]) => {
      this.allPokemons = pokemons;
      this.dataSource = new MatTableDataSource(this.allPokemons);
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectPoke(pokeId: string) {
    this.selectedPoke = pokeId;
    console.log('selected pokemon\'s id = ' + this.selectedPoke);
  }
}
