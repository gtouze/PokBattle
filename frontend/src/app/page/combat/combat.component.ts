import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { EquipeService } from '../../_webservices/equipe.webservice';
import { Equipe } from '../../models/equipe.model';
import { DresseurService } from '../../_webservices/dresseur.webservice';
import { Dresseur } from '../../models/dresseur.model';


@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {
  isLoggedIn = false;
  vueCombat = false;
  username: string;
  idDresseur: string;
  nomEquipeList = [];
  nomEquipeListD2  = [];
  selectedEquipe1 =  [];
  nomDresseurList = [];
  selectedDresseur = '';
  selectedTeamName1 = '';
  selectedTeamName2 = '';
  selectedEquipe2 =  [];
  listeEquipes1: Equipe[];
  listeEquipes2: Equipe[];

  constructor(private tokenStorageService: TokenStorageService,  private equipeService: EquipeService,
              private dresseurService: DresseurService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.idDresseur = user.id;
    }

    this.loadNomEquipeByIdDresseur(this.idDresseur);
    this.loadAllNomDresseur();
    // this.loadNomEquipeByIdDresseurD2('');

    document.body.classList.add('combat-bg-img');
  }

  private loadNomEquipeByIdDresseur(id: string) {
    this.equipeService.getEquipesByDresseurId(id).subscribe((equipes: Equipe[]) => {
      this.listeEquipes1 = equipes;
      for (const team of equipes) {
        if (this.nomEquipeList.indexOf(team.nomEquipe) === -1) {
          this.nomEquipeList.push(team.nomEquipe);
        }
      }
      this.nomEquipeList.sort();
      }, (err) => {
        console.error(err);
      });
  }

  private loadNomEquipeByIdDresseurD2(id: number) {
    this.equipeService.getEquipesByDresseurId(id.toString()).subscribe((equipes: Equipe[]) => {
      this.listeEquipes2 = equipes;
      for (const team of equipes) {
        if (this.nomEquipeListD2.indexOf(team.nomEquipe) === -1) {
          this.nomEquipeListD2.push(team.nomEquipe);
        }
      }
      this.nomEquipeListD2.sort();
      }, (err) => {
        console.error(err);
      });
  }

  private loadAllNomDresseur() {
    this.dresseurService.getAllDresseur().subscribe((dresseurs: Dresseur[]) => {
      for (const name of dresseurs) {
        // Si équipe pas déjà présente
        if (this.nomDresseurList.indexOf(name.username) === -1) {
          this.nomDresseurList.push(name.username);
        }
      }
      this.nomDresseurList.sort();
    }, (err) => {
      console.error(err);
    });
  }

  getDresseurId() {
    this.dresseurService.getDresseurByUsername(this.selectedDresseur).subscribe((dresseurs: Dresseur[]) => {
      this.nomEquipeListD2 = [];
      for (const dresseur of dresseurs) {
        this.loadNomEquipeByIdDresseurD2(dresseur.id);
      }
    });
  }

  changeVue() {
    this.vueCombat = !this.vueCombat;
  }

  updateSelectedEquipe1() {
    // On réinitialise la valeur
    this.selectedEquipe1.length = 0;

    // Attribution de la nouvelle valeur
    for (const team of this.listeEquipes1) {
      if (team.nomEquipe === this.selectedTeamName1) {
        this.selectedEquipe1.push(team);
      }
    }
  }

  updateSelectedEquipe2() {
    // On réinitialise la valeur
    this.selectedEquipe2.length = 0;

    // Attribution de la nouvelle valeur
    for (const team of this.listeEquipes2) {
      if (team.nomEquipe === this.selectedTeamName2) {
        this.selectedEquipe2.push(team);
      }
    }
  }

}
