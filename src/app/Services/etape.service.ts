import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {
  private http = inject(HttpClient);
  getEtape(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}etapes/${id}`);
  }
  constructor() { }
}
