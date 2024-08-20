import { Component, inject, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RolesService } from '../../../Services/roles.service';
import { Role } from '../../../Models/users.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  selectedRole: Role = { id: 0, name: '' };

  @ViewChild('editRoleModal', { static: true }) editRoleModal!: TemplateRef<any>;
 // Declaration de la variable editRoleModal

  constructor(private roleService: RolesService
    , private modalService: NgbModal
  ) {}

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
  
 // Méthode pour ouvrir la modale et sélectionner le rôle à modifier
 openModal(role: Role): void {
  this.selectedRole = { ...role }; // Copier les données du rôle sélectionné
  this.modalService.open(this.editRoleModal, { ariaLabelledBy: 'editRoleModalLabel' }).result.then(
    (result) => {
      console.log(`Closed with: ${result}`);
    },
    (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    }
  );
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


// Méthode pour gérer la soumission du formulaire de modification
onUpdateRole(): void {
  this.roleService.updateRole(this.selectedRole).subscribe({
    next: (response) => {
      console.log('Role updated successfully:', response);
      this.loadRoles(); // Rafraîchit la liste des rôles après modification
      this.modalService.dismissAll(); // Ferme la modale après succès
    },
    error: (error) => {
      console.error('Error updating role:', error);
    }
  });
}
}

