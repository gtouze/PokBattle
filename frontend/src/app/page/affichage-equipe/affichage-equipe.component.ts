import { Component, OnInit } from '@angular/core';
import { EquipeService } from 'src/app/_webservices/equipe.webservice';
import { Equipe } from 'src/app/models/equipe.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-affichage-equipe',
  templateUrl: './affichage-equipe.component.html',
  styleUrls: ['./affichage-equipe.component.css']
})
export class AffichageEquipeComponent implements OnInit {
  dresseurId: string;
  equipes: Equipe[];
  nomEquipeList = [];
  selectedName = '';
  selectedTeam = [];

  constructor(private tokenStorageService: TokenStorageService, private equipeService: EquipeService) { }

  ngOnInit(): void {
    // Récupération de l'id du dresseur connecté
    const user = this.tokenStorageService.getUser();
    this.dresseurId = user.id;

    this.equipeService.getEquipesByDresseurId(this.dresseurId).subscribe((teams: Equipe[]) => {
      this.equipes = teams;

      for (const team of teams) {
        // Si équipe pas déjà présente
        if (this.nomEquipeList.indexOf(team.nomEquipe) === -1) {
          this.nomEquipeList.push(team.nomEquipe);
        }
      }
      this.nomEquipeList.sort();

    }, (err) => {
      console.error(err);
    });

    document.body.classList.remove('combat-bg-img');
  }

  updateSelectedTeam() {
    // On réinitialise la valeur
    this.selectedTeam.length = 0;

    // Attribution de la nouvelle valeur
    for(const team of this.equipes) {
      if(team.nomEquipe === this.selectedName) {
        this.selectedTeam.push(team);
      }
    }
  }
}
