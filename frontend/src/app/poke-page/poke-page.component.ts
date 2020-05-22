import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../_webservices/pokemon.webservice';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '../models/pokemon.model';
import { MatSort } from '@angular/material/sort';
import { EquipeService } from '../_webservices/equipe.webservice';
import { Equipe } from '../models/equipe.model';
import { CapaciteService } from '../_webservices/capacite.webservice';
import { Capacite } from '../models/capacite.model';

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
  selectedPoke = 0;
  nomEquipeList = [];

  selectedEquipe1 = '';
  selectedEquipe2 = '';

  capacite1Nom = '';
  capacite1Type = '';
  capacite1Puiss = 0;
  capacite1Prec = 0;

  capacite2Nom = '';
  capacite2Type = '';
  capacite2Puiss = 0;
  capacite2Prec = 0;

  createdCapacite1Id: number;
  createdCapacite2Id: number;

  constructor(private pokemonService: PokemonService, private equipeService: EquipeService, private capaciteService: CapaciteService) { }

  ngOnInit(): void {
    this.loadAllNomEquipe();
    this.loadAllPokemons();
  }

  private loadAllPokemons() {
    this.pokemonService.getAllPokemon().subscribe((pokemons: Pokemon[]) => {
      this.allPokemons = pokemons;
      this.dataSource = new MatTableDataSource(this.allPokemons);
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.error(err);
    });
  }

  private loadAllNomEquipe() {
    this.equipeService.getAllEquipe().subscribe((equipes: Equipe[]) => {
      for (const team of equipes) {
        // Si équipe pas déjà présente
        if (this.nomEquipeList.indexOf(team.nomEquipe) === -1) {
          this.nomEquipeList.push(team.nomEquipe);
        }
      }
      this.nomEquipeList.sort();
    }, (err) => {
      console.error(err);
    });
  }

  private createTeam() { // TODO Recuperation du dresseur id
    let selectedName;
    if (this.selectedEquipe2 === '') {
      selectedName = this.selectedEquipe1;
    } else {
      selectedName = this.selectedEquipe2;
    }

    if (this.capacite2Nom !== '') {
      this.equipeService.postEquipe(new Equipe(null, selectedName, 12,
        this.selectedPoke, this.createdCapacite1Id, this.createdCapacite2Id)).subscribe((capa2: any) => {
      }, (err) => { console.error(err); });
    } else {
      this.equipeService.postEquipe(new Equipe(null, selectedName, 12,
        this.selectedPoke, this.createdCapacite1Id, null)).subscribe((capa2: any) => {
      }, (err) => { console.error(err); });
    }
  }

  createAbilities() {
    // Création de la capacité n°1
    return this.capaciteService.postCapacite(new Capacite(1, this.capacite1Nom, this.capacite1Puiss,
           this.capacite1Prec, this.capacite1Type)).subscribe((capa1: any) => {
        this.createdCapacite1Id = capa1.insertId;

        // Création de la capacité n°2 si nécessaire
        if (this.capacite2Nom !== '') {
          this.capaciteService.postCapacite(new Capacite(1, this.capacite2Nom, this.capacite2Puiss,
            this.capacite2Prec, this.capacite2Type)).subscribe((capa2: any) => {
              this.createdCapacite2Id = capa2.insertId;
              this.createTeam();
          }, (err) => { console.error(err); });
        } else {
          this.createTeam();
        }
    }, (err) => { console.error(err); });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectPoke(pokeId: number) {
    this.selectedPoke = pokeId;
  }

  changeCapacite1(attributsCapa: any) {
    this.capacite1Nom = attributsCapa.nom;
    this.capacite1Type = attributsCapa.type;
    this.capacite1Puiss = attributsCapa.puissance;
    this.capacite1Prec = attributsCapa.precision;
  }

  changeCapacite2(attributsCapa: any) {
    this.capacite2Nom = attributsCapa.nom;
    this.capacite2Type = attributsCapa.type;
    this.capacite2Puiss = attributsCapa.puissance;
    this.capacite2Prec = attributsCapa.precision;
  }

}
