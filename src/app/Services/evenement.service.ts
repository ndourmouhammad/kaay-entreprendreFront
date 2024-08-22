import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiUrl } from './apiUrl';
import { Evenement } from '../Models/evenements.model';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private endpoint = `${apiUrl}/evenements`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les événements
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<{ data: any[] }>(this.endpoint).pipe(
      map(response => this.transformEvenements(response.data)),
      catchError(error => {
        console.error('Erreur lors de la récupération des événements:', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Récupérer un événement par ID
  getEvenement(id: number): Observable<Evenement> {
    return this.http.get<any>(`${this.endpoint}/${id}`).pipe(
      map(response => this.transformEvenement(response)),
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        return of({} as Evenement); // Retourne un objet vide en cas d'erreur
      })
    );
  }

  // Transformer un tableau d'événements
  private transformEvenements(data: any[]): Evenement[] {
    if (!Array.isArray(data)) {
      console.error('Les données reçues ne sont pas au format attendu:', data);
      return []; // Retourne un tableau vide en cas de format incorrect
    }
    return data.map(item => this.transformEvenement(item));
  }

  // Transformer un événement individuel
  private transformEvenement(item: any): Evenement {
    return {
      ...item,
      date_debut: this.toValidDate(item.date_debut),
      date_fin: this.toValidDate(item.date_fin),
      created_at: this.toValidDate(item.created_at),
      updated_at: this.toValidDate(item.updated_at)
    } as Evenement;
  }

  // Convertir en date valide ou renvoyer undefined
  private toValidDate(date: any): Date | undefined {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }
}
