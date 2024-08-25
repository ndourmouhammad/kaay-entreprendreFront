import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {
private http=inject(HttpClient)
  constructor() { }
 
}
