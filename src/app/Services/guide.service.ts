import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private http = inject(HttpClient);
  constructor() { }
  getGuide(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}guides/${id}`);
  }
  getEtapeDetails(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}etapes/${id}`);
  }
}
