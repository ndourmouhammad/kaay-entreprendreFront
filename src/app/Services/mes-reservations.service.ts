import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';


@Injectable({
  providedIn: 'root'
})
export class MesReservationsService {
  private http = inject(HttpClient);
  constructor() { }

  
}
