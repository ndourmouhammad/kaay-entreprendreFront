import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetourExperienceService {

  constructor() { }
  private http= inject(HttpClient)

  getAllRetourEXperience(){
    return this.http.get(`${apiUrl}retour-experience`);
  }
}
