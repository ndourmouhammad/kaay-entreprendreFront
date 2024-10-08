import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Role } from '../Models/users.model';


@Injectable({
    providedIn: 'root'
})
export class RolesService {

    private http = inject(HttpClient);

    // Method to get the list of roles
    getRoles(): Observable<{ message: string, data: Role[] }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.get<{ message: string, data: Role[] }>(`${apiUrl}roles`, { headers });
    }

    // Mehtode pour supprimer un role
    deleteRole(id: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.delete<any>(`${apiUrl}roles/${id}`, { headers });
    }

    // Mehtode pour ajouter un role
    addRole(role: Role): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.post<any>(`${apiUrl}roles`, role, { headers });
    }

    // Mehtode pour modifier un role
    updateRole(role: Role): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.post<any>(`${apiUrl}roles/${role.id}`, role, { headers });
    }

    // Méthode pour octroyer des permissions à un role : http://127.0.0.1:8000/api/roles/{id}/permission
    addPermissionToRole(roleId: number, permissionId: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    
        return this.http.post<any>(`${apiUrl}roles/${roleId}/permission`, 
            { permissionId: permissionId }, 
            { headers })
            .pipe(
                catchError(error => {
                    console.error('Error assigning permission:', error);
                    return throwError(error);
                })
            );
    }
}