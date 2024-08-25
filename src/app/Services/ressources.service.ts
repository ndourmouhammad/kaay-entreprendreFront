import { RessourceModel } from '../Models/ressources.models';
import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RessourcesService {

    private http = inject(HttpClient);

    // Méthode pour afficher la liste des ressources
    getRessources(): Observable<{ message: string, data: RessourceModel[] }> {
        return this.http.get<{ message: string, data: RessourceModel[] }>(`${apiUrl}ressources`);
    }

    // Méthode pour afficher les details d'une ressource
    getRessource(id: number): Observable<any> {
        return this.http.get<any>(`${apiUrl}ressources/${id}`);
    }

    

    // Méthode pour ajouter une ressource
    addRessource(ressource: FormData): Observable<{ message: string, data: RessourceModel }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${apiUrl}ressources`, ressource, { headers });
    }

    // Mehtode pour modifier une ressource
    updateRessource(ressource: FormData, id: number): Observable<{ message: string, data: RessourceModel }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${apiUrl}ressources/${id}`, ressource, { headers });
    }
}