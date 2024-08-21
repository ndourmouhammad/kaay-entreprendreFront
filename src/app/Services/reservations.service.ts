import { EvenementModel } from './../Models/evenements.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { ReservationModel } from '../Models/reservation.model';


@Injectable({
    providedIn: 'root'
})
export class ReservationsService {

    private http = inject(HttpClient);

    getReservations(id: number): Observable<{ message: string, data: ReservationModel[] }> {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return throwError('No authentication token found');
        }
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      
        return this.http.get<{ message: string, data: ReservationModel[] }>(`${apiUrl}evenements/${id}/reservations`, { headers });
      }
      
    
}