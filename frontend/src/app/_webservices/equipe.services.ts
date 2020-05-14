import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})

export class EquipeService {
  url = 'http://localhost:3000/equipes';

  constructor(private http: HttpClient) { }

  getAllEquipe() {
    return this.http.get<Equipe[]>(this.url);
  }

  getEquipeById(equipeId: string) {
    return this.http.get<Equipe>(this.url + '/' + equipeId);
  }

}
