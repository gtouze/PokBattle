import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  url = 'http://localhost:3000/pokemons';
  constructor(private http: HttpClient) { }
  getAllPokemon() {
    return this.http.get<Pokemon[]>(this.url);
  }
  getPokemonById(pokemonId: string) {
    return this.http.get<Pokemon>(this.url + '/' + pokemonId);
  }

}
