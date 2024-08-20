import { Component, inject, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RolesService } from '../../../Services/roles.service';
import { Role } from '../../../Models/users.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-roles',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './access-roles.component.html',
  styleUrl: './access-roles.component.css'
})
export class AccessRolesComponent implements OnInit {
  // roles: Role[] = [];
  // newRoleName = '';
  // newRole: Role = { id: 0, name: '' };

  // permissions: Permission[] = []; // Déclaration de la variable permissions
  // newPermission: Permission = { name: '' }; // Modèle pour la nouvelle permission

  // Declaration de la variable roles
  roles: Role[] = [];
  newRole: Role = { id: 0, name: '' };

  constructor(private roleService: RolesService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data.data;
    });
  }

  // Méthode pour supprimer un rôle
  deleteRole(id: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this role?')) {
        this.roleService.deleteRole(id).subscribe({
          next: (response) => {
            console.log('Role deleted successfully:', response);
            this.roles = this.roles.filter(role => role.id !== id);
          },
          error: (error) => {
            console.error('Error deleting role:', error);
          }
        });
      }
    } else {
      console.error('Role ID is undefined');
    }
  }

  // Méthode pour ajouter un nouveau rôle
  addRole(role: Role): void {
    this.roleService.addRole(role).subscribe({
      next: (response) => {
        console.log('Role added successfully:', response);
        this.roles.push(response.data); // Ajoute le nouveau rôle à la liste
        this.newRole = {  id: 0, name: '' }; // Réinitialise le formulaire
      },
      error: (error) => {
        console.error('Error adding role:', error);
      }
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onRoleSubmit(): void {
    if (this.newRole.name) {
      this.addRole(this.newRole);
    }
  }
  
}

