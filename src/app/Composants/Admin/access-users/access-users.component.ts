import { Component, inject, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../../Services/users.service';
import { UserModel } from '../../../Models/users.model';
import { NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-access-users',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgFor,
    NgIf,
    
  ],
  templateUrl: './access-users.component.html',
  styleUrl: './access-users.component.css'
})
export class AccessUsersComponent implements OnInit {

  // Injection des dépépendances
  private userService = inject(UsersService)


  // Declaration des variables
  users: UserModel[] = [];


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        console.log('Data:', response); // Vérifiez ici ce que vous recevez
        this.users = response.data; // Assurez-vous de prendre le tableau 'data'
      },
      (error: any) => {
        console.error('Error:', error); // En cas d'erreur, affichez-la
      }
    );
  }

  // supprimer un user
  deleteUser(id: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(id).subscribe(
          (response: any) => {
            console.log('User deleted successfully:', response);
            this.users = this.users.filter(user => user.id !== id);
          },
          (error: any) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    } else {
      console.error('User ID is undefined');
    }
  }
  
  
  
  


  
  getRoleName(user: UserModel): string {
    // Assuming you fetch roles separately, or have them as part of another related model
    return user.roles && user.roles.length > 0 ? user.roles[0].name : 'User';
  }

  
  
}
