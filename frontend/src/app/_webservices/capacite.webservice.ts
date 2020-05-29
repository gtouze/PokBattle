import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capacite } from '../models/capacite.model';

@Injectable({
  providedIn: 'root'
})

export class CapaciteService {
  url = 'http://localhost:3000/capacites';
  constructor(private http: HttpClient) { }
  getAllCapacite() {
    return this.http.get<Capacite[]>(this.url);
  }
  getCapaciteById(capaciteId: string) {
    return this.http.get<Capacite>(this.url + '/' + capaciteId);
  }
  postCapacite(capacite: Capacite): Observable<Capacite> {
    return this.http.post<Capacite>(this.url, capacite);
  }
  putCapacite(capacite: Capacite): Observable<Capacite> {
    return this.http.put<Capacite>(this.url + '/' + capacite.idCapacite, capacite);
  }
  deleteCapacite(capaciteId: string): Observable<Capacite> {
    return this.http.delete<Capacite>(this.url + '/' + capaciteId);
  }
}
