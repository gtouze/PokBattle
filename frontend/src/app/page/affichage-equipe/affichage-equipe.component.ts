import { Component, OnInit } from '@angular/core';
import { EquipeService } from 'src/app/_webservices/equipe.webservice';
import { Equipe } from 'src/app/models/equipe.model';

@Component({
  selector: 'app-affichage-equipe',
  templateUrl: './affichage-equipe.component.html',
  styleUrls: ['./affichage-equipe.component.css']
})
export class AffichageEquipeComponent implements OnInit {

  equipes: Equipe[];

  constructor(private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.equipeService.getEquipesByDresseurId('12').subscribe((teams: Equipe[]) => { // TODO remplacer id dresseur
      this.equipes = teams;
      console.log(this.equipes);
    }, (err) => {
      console.error(err);
    });
    document.body.classList.remove ("accueil-bg-img");
    document.body.classList.remove ("capture-bg-img");
    document.body.classList.remove ("register-bg-img");
    document.body.classList.remove ("authpage-bg-img");
    document.body.classList.add ("équipe-bg-img");
  }
}
