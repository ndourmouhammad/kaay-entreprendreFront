import { Component, inject, NgModule, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { PermissionsService } from '../../../Services/permissions.service';
import { Permission } from '../../../Models/permissions.models';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-access-permissions',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgFor,
    NgxPaginationModule,
    NgIf,
    FormsModule
],
  templateUrl: './access-permissions.component.html',
  styleUrl: './access-permissions.component.css'
})
export class AccessPermissionsComponent implements OnInit {
  permissions: Permission[] = []; // Déclaration de la variable permissions
  newPermission: Permission = { name: '' }; // Modèle pour la nouvelle permission
  itemsPerPage: number = 10; // Nombre d'éléments par page
  currentPage: number = 1; // Page actuelle

  private permissionService = inject(PermissionsService);

  ngOnInit(): void {
    this.getPermissions();
  }

  // Méthode pour afficher la liste des permissions
   // Méthode pour afficher la liste des permissions
   getPermissions(): void {
    this.permissionService.getPermissions().subscribe({
      next: (response) => {
        this.permissions = response.data;
      },
      error: (error) => {
        console.error('Error fetching permissions:', error);
      }
    });
  }

  // Méthode pour changer de page
  pageChanged(event: number): void {
    this.currentPage = event;
  }

  // Méthode pour supprimer une permission
  deletePermission(id: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this permission?')) {
        this.permissionService.deletePermission(id).subscribe({
          next: (response) => {
            console.log('Permission deleted successfully:', response);
            this.permissions = this.permissions.filter(permission => permission.id !== id);
          },
          error: (error) => {
            console.error('Error deleting permission:', error);
          }
        });
      }
    } else {
      console.error('Permission ID is undefined');
    }
  }

  // Méthode pour ajouter une permission
  // Méthode pour ajouter une nouvelle permission
  addPermission(permission: Permission): void {
    this.permissionService.addPermission(permission).subscribe({
      next: (response) => {
        console.log('Permission added successfully:', response);
        this.permissions.push(response.data); // Ajoute la nouvelle permission à la liste
        this.newPermission = { name: '' }; // Réinitialise le formulaire
      },
      error: (error) => {
        console.error('Error adding permission:', error);
      }
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.newPermission.name) {
      this.addPermission(this.newPermission);
    }
  }
}
