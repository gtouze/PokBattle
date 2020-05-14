import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../_webservices/pokemon.services';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '../models/pokemon.model';
import { MatSort } from '@angular/material/sort';
import { EquipeService } from '../_webservices/equipe.services';
import { Equipe } from '../models/equipe.model';

@Component({
  selector: 'app-poke-page',
  templateUrl: './poke-page.component.html',
  styleUrls: ['./poke-page.component.css']
})
export class PokePageComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  allPokemons: Pokemon[];
  allEquipes: Equipe[];
  dataSource: MatTableDataSource<Pokemon>;
  equipeData: MatTableDataSource<Equipe>;
  displayedColumns: string[] = ['idPokemon', 'nom', 'type', 'pv', 'atk', 'def', 'vit'];
  selectedPoke: string;

  constructor(private pokemonService: PokemonService, private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.loadAllTeams();
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

  loadAllTeams() {//TODO
/*    this.equipeService.getAllEquipe().subscribe((equipes: Equipe[]) => {
      this.allEquipes = equipes;
      this.equipeData = new MatTableDataSource(this.allEquipes);
      this.equipeData.sort = this.sort;
    }, (err) => {
      console.log(err);
    });*/
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
