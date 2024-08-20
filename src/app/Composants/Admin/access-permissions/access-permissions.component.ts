import { Component, inject, NgModule, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { PermissionsService } from '../../../Services/permissions.service';
import { Permission } from '../../../Models/permissions.models';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



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
  selectedPermission: Permission = { name: '' };

  @ViewChild('editPermissionModal', { static: true }) editPermissionModal!: TemplateRef<any>;

  private permissionService = inject(PermissionsService);
  private modalService = inject(NgbModal);

  

  ngOnInit(): void {
    this.getPermissions();
  }

 
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

  // Méthode pour ouvrir la modale et sélectionner le rôle à modifier
 openModal(permission: Permission): void {
  this.selectedPermission = { ...permission }; // Copier les données du rôle sélectionné
  this.modalService.open(this.editPermissionModal, { ariaLabelledBy: 'editPermissionModalLabel' }).result.then(
    (result) => {
      console.log(`Closed with: ${result}`);
    },
    (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    }
  );
}

// Méthode pour gérer la soumission du formulaire de modification
onUpdatePermission(): void {
  this.permissionService.updatePermission(this.selectedPermission).subscribe({
    next: (response) => {
      console.log('Permission updated successfully:', response);
      this.getPermissions(); // Rafraîchit la liste des rôles après modification
      this.modalService.dismissAll(); // Ferme la modale après succès
    },
    error: (error) => {
      console.error('Error updating role:', error);
    }
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
