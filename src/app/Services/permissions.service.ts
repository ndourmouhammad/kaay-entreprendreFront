import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Permission } from '../Models/permissions.models';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    private http = inject(HttpClient);

    

    // Method to get the list of permissions
    getPermissions(): Observable<{ message: string, data: Permission[] }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.get<{ message: string, data: Permission[] }>(`${apiUrl}permissions`, { headers });
    }

    // Mehtode pour supprimer une permission
    deletePermission(id: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.delete<any>(`${apiUrl}permissions/${id}`, { headers });
    }

    // Mehtode pour ajouter une permission
    addPermission(permission: Permission): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.post<any>(`${apiUrl}permissions`, permission, { headers });
    }

    // Mehtode pour modifier une permission
    updatePermission(permission: Permission): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError('No authentication token found');
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.post<any>(`${apiUrl}permissions/${permission.id}`, permission, { headers });
    }
}