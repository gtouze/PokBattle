import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  dresseurId: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    //const user = this.tokenStorageService.getUser();
    //this.dresseurId = user.username;

    //console.log('id dresseur: ' + this.dresseurId);
  }

}
