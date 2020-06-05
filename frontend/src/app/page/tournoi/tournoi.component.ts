import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {

  participant1: string;
  participant2: string;
  participant3: string;
  participant4: string;
  participants = [];
  finaliste1: string;
  finaliste2: string;
  winnerFinal: string;
  tournoi = [];
  afficherTournoi = false;
  constructor() { }

  ngOnInit(): void {
    document.body.classList.remove('combat-bg-img');
    document.body.classList.remove ('accueil-bg-img');
    document.body.classList.remove ('capture-bg-img');
    document.body.classList.remove ('register-bg-img');
    document.body.classList.remove ('authpage-bg-img');
    document.body.classList.add ('équipe-bg-img');
  }

  creerTournoi() {
    // nombre de manche nécessaire =
    this.afficherTournoi = true;
    this.tournoi = [];

    this.participants.push(this.participant1);
    this.participants.push(this.participant2);
    this.participants.push(this.participant3);
    this.participants.push(this.participant4);

    this.participants.sort(() => Math.random() - 0.5);

    this.tournoi.push({
      joueur1: this.participants[0],
      joueur2: this.participants[1]
    });
    this.tournoi.push({
      joueur1: this.participants[2],
      joueur2: this.participants[3]
    });
  }

  gagnantM1(winner: string) {
    if (this.finaliste1) {
      this.finaliste2 = winner;
    } else {
      this.finaliste1 = winner;
    }
  }

  gagnantFinal(winner: string) {
    this.winnerFinal = winner;
  }
}
