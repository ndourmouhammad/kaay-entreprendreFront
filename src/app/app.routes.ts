import { Routes } from '@angular/router';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { RessourceComponent } from './Composants/Coach/ressource/ressource.component';
import { RessourceFormComponent } from './Composants/Coach/ressource-form/ressource-form.component';
import { RessourceDetailComponent } from './Composants/Coach/ressource-detail/ressource-detail.component';
import { CategorieCoachComponent } from './Composants/Coach/categorie-coach/categorie-coach.component';
import { EvenementCoachComponent } from './Composants/Coach/evenement-coach/evenement-coach.component';
import { DetailEvenementCoachComponent } from './Composants/Coach/detail-evenement-coach/detail-evenement-coach.component';
import { ProfilCoachComponent } from './Composants/Coach/profil-coach/profil-coach.component';
import { DashboardAdminComponent } from './Composants/Admin/dashboard-admin/dashboard-admin.component';
import { AccessAdminComponent } from './Composants/Admin/access-admin/access-admin.component';
import { AccessUsersComponent } from './Composants/Admin/access-users/access-users.component';
import { AccessUsersDetailComponent } from './Composants/Admin/access-users-detail/access-users-detail.component';
import { AccessRolesComponent } from './Composants/Admin/access-roles/access-roles.component';
import { AccessPermissionsComponent } from './Composants/Admin/access-permissions/access-permissions.component';
import { EvenementAdminComponent } from './Composants/Admin/evenement-admin/evenement-admin.component';
import { EvenementsDetailsAdminComponent } from './Composants/Admin/evenements-details-admin/evenements-details-admin.component';
import { ReservationsComponent } from './Composants/Admin/reservations/reservations.component';
import { AjoutEvenementComponent } from './Composants/Admin/ajout-evenement/ajout-evenement.component';
import { ProfilAdminComponent } from './Composants/Admin/profil-admin/profil-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },

    // Routes pour Coach
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    { path: 'ressources-coach', component: RessourceComponent},
    { path: 'ressource-form', component: RessourceFormComponent},
    { path: 'ressource-details' , component: RessourceDetailComponent},
    { path: 'ressources-categorie', component: CategorieCoachComponent},
    { path: 'events-coach', component: EvenementCoachComponent},
    { path: 'events-details-coach', component: DetailEvenementCoachComponent},
    { path: 'profil-coach', component: ProfilCoachComponent},

    // Routes pour Admin
    { path: 'dashboard-admin', component: DashboardAdminComponent},
    { path: 'access-admin', component: AccessAdminComponent},
    { path: 'access-users', component: AccessUsersComponent},
    { path: 'access-users-details', component: AccessUsersDetailComponent},
    { path: 'access-roles', component: AccessRolesComponent},
    { path: 'access-permissions', component: AccessPermissionsComponent},
    { path: 'evenement-admin', component: EvenementAdminComponent},
    { path: 'events-details-admin', component: EvenementsDetailsAdminComponent},
    { path: 'reservations', component: ReservationsComponent},
    { path: 'ajouter-evenement', component: AjoutEvenementComponent},
    { path: 'profil-admin', component: ProfilAdminComponent}
];
