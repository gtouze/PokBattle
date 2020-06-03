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
  username: string;
  idDresseur: string;
  nomEquipeList = [];
  nomEquipeListD2  =[];
  selectedEquipe = '';
  nomDresseurList = [];
  selectedDresseur = '';
  Dresseur2: [];
  

  constructor(private tokenStorageService: TokenStorageService,  private equipeService: EquipeService, private dresseurService: DresseurService) { }

  ngOnInit(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.idDresseur = user.id;
    }
    
    const dresseur2 = this.dresseurService.getDresseurByUsername(this.selectedDresseur);
    console.log(dresseur2);

    this.loadNomEquipeByIdDresseur(this.idDresseur);
    this.loadAllNomDresseur();
    this.loadNomEquipeByIdDresseurD2('12');

    document.body.classList.add('combat-bg-img');
  }

  private loadNomEquipeByIdDresseur(id: string) {
    this.equipeService.getEquipesByDresseurId(id).subscribe((equipes: Equipe[]) => {
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

  private loadNomEquipeByIdDresseurD2(id: string) {
    this.equipeService.getEquipesByDresseurId(id).subscribe((equipes: Equipe[]) => {
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
      console.log(this.selectedDresseur);
    }, (err) => {
      console.error(err);
    });
  }
}
