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
  dataSource: MatTableDataSource<Pokemon>;
  displayedColumns: string[] = ['idPokemon', 'nom', 'type', 'pv', 'atk', 'def', 'vit'];
  selectedPoke: string;
  nomEquipeList = [];

  constructor(private pokemonService: PokemonService, private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.loadAllNomEquipe();
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

  loadAllNomEquipe() {
    this.equipeService.getAllEquipe().subscribe((equipes: Equipe[]) => {
      for (const team of equipes) {
        this.nomEquipeList.push(team.nomEquipe);
      }
      this.nomEquipeList.sort();
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
