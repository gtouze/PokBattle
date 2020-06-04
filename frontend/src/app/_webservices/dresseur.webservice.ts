import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dresseur } from '../models/dresseur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DresseurService {
  url = 'http://localhost:3000/dresseurs';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getAllDresseur() {
    return this.http.get<Dresseur[]>(this.url, this.httpOptions);
  }

  getDresseurById(id: string) {
    return this.http.get<Dresseur[]>(this.url + '/' + id);
  }

  getDresseurByUsername(username: string) {
    return this.http.get<Dresseur[]>(this.url + '/' + username);
  }
}
