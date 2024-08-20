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
}
