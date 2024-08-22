import { CategorieModel } from '../Models/categories.model';
import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CategorieService {

    private http = inject(HttpClient);

    // Méthodes pour lister les categories
    getCategories(): Observable<{ message: string, data: CategorieModel[] }> {
        return this.http.get<{ message: string, data: CategorieModel[] }>(`${apiUrl}categories`);
    }
}