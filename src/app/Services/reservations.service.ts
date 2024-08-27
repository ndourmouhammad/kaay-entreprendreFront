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

    // Méthode pour afficher la liste des reservations pour un evénement
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
      
      // Méthode pour accepter une réservation : http://127.0.0.1:8000/api/reservations/{id}/confirmer
      acceptReservation(id: number): Observable<{ message: string, data: ReservationModel}> {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return throwError('No authentication token found');
        }
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      
        return this.http.post<any>(`${apiUrl}reservations/${id}/confirmer`, { headers });
      }

      // Méthode pour refuser une reservation : http://127.0.0.1:8000/api/reservations/{id}/refuser
      refuserReservation(id: number): Observable<{ message: string, data: ReservationModel}> {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return throwError('No authentication token found');
        }
      
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${apiUrl}reservations/${id}/refuser`, { headers });
      }

      // Méthode pour faire une réservation : http://127.0.0.1:8000/api/evenements/{id}/reservation
      addReservation(reservation: FormData, id: number): Observable<{ message: string, data: ReservationModel }> {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return throwError('No authentication token found');
        }
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      
        return this.http.post<any>(`${apiUrl}evenements/${id}/reservation`, reservation, { headers });
      }

      // Méthode pour vérifier si un utilisateur a fait une réservation à un event : Route::get('/evenements/{evenement_id}/user-reservation', [ReservationController::class, 'checkUserReservation']);
      checkUserReservation(id: number): Observable<{ message: string, data: ReservationModel }> {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return throwError('No authentication token found');
        }
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      
        return this.http.get<any>(`${apiUrl}evenements/${id}/user-reservation`, { headers });
      }
    
}