// import { Injectable, inject } from "@angular/core";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { apiUrl } from "./apiUrl";
// import { Observable, throwError } from "rxjs";
// import { RetourExperienceModel } from "../Models/retourExperience.models";


// @Injectable({
//     providedIn: 'root'
// })
// export class RetourExperienceService {

//     private http = inject(HttpClient);

//     // Méthodes pour lister les retours d'experiences
//     getRetourExperiences(): Observable<{ message: string, data: RetourExperienceModel[] }> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }

//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });

//         return this.http.get<{ message: string, data: RetourExperienceModel[] }>(`${apiUrl}retour-experience`, { headers });
//     }

//     // Méthodes pour ajouter un retour d'experience
//     addRetourExperience(retourExperience: RetourExperienceModel): Observable<{ message: string, data: RetourExperienceModel }> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }

//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });

//         return this.http.post<{ message: string, data: RetourExperienceModel }>(`${apiUrl}retour-experience`, retourExperience, { headers });
//     }
// }

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { apiUrl } from "./apiUrl";
import { Observable, throwError } from "rxjs";
import { RetourExperienceModel } from "../Models/retourExperience.models";

@Injectable({
    providedIn: 'root'
})
export class RetourExperienceService {

    private http = inject(HttpClient);

    // Méthodes pour lister les retours d'experiences
    getRetourExperiences(): Observable<{ message: string, data: RetourExperienceModel[] }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<{ message: string, data: RetourExperienceModel[] }>(`${apiUrl}retour-experience`, { headers });
    }

    // Méthodes pour ajouter un retour d'experience
    addRetourExperience(retourExperience: FormData): Observable<{ message: string, data: RetourExperienceModel }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<{ message: string, data: RetourExperienceModel }>(`${apiUrl}retour-experience`, retourExperience, { headers });
    }

    // Méthodes pour supprimer un retour d'experience
    deleteRetourExperience(id: number): Observable<{ message: string, data: RetourExperienceModel }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.delete<{ message: string, data: RetourExperienceModel }>(`${apiUrl}retour-experience/${id}`, { headers });
    }

    updateRetourExperience(formData: FormData): Observable<{ message: string, data: RetourExperienceModel }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.post<{ message: string, data: RetourExperienceModel }>(
            `${apiUrl}retour-experience/${formData.get('id')}`, 
            formData, 
            { headers }
        );
    }
    
}
