import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelProfil } from '../Models/profil.model';
import { secteurModel } from '../Models/seteur.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  
private http= inject(HttpClient)


getUserProfile(): Observable<ModelProfil> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<ModelProfil>(`${apiUrl}user_connecte`, { headers });
}

updateUserProfile(profileData: ModelProfil, photoFile?: File, cvFile?: File): Observable<any> {
  const formData: FormData = new FormData();
  
  formData.append('id', profileData.id?.toString() || '');
  formData.append('name', profileData.name || '');
  formData.append('email', profileData.email || '');
  formData.append('adresse', profileData.adresse || '');
  formData.append('telephone', profileData.telephone || '');
  formData.append('statut', profileData.statut ? '1' : '0');
  
  if (profileData.secteur_activite_id) {
    formData.append('secteur_activite_id', profileData.secteur_activite_id.toString());
  }

  if (photoFile) {
    formData.append('photo', photoFile);
  }

  if (cvFile) {
    formData.append('cv', cvFile);
  }

  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.post(`${apiUrl}update/${profileData.id}`, formData, { headers }).pipe(
    catchError(error => {
      console.error('Erreur lors de la mise à jour du profil:', error);
      console.error('Détails de l\'erreur:', error.error);
      return throwError(() => error);
    })
  );
}




getmesreservation(): Observable<any> {
  const token = localStorage.getItem('access_token');
  console.log('Token:', token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log('Authorization Header:', headers.get('Authorization'));
  return this.http.get<any[]>(`${apiUrl}mes-reservations`, { headers });
}
getSecteurs(): Observable<secteurModel[]> {
  return this.http.get<secteurModel[]>(`${apiUrl}secteurActivite`);
}


}
