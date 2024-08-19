import { Routes } from '@angular/router';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';

export const routes: Routes = [
   
    {path:'userprofil',component:UserProfilComponent},
    {path:'modifier-profil',component:ModifierProfilComponent},
];
