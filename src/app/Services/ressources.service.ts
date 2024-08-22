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
}