import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipe } from '../models/equipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EquipeService {
  url = 'http://localhost:3000/equipes';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getAllEquipe() {
    return this.http.get<Equipe[]>(this.url, this.httpOptions);
  }

  getEquipesByDresseurId(dresseurId: string) {
    return this.http.get<Equipe[]>(this.url + '/' + dresseurId);
  }

  postEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.url, equipe);
  }
}
