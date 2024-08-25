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
import { RegisterComponent } from './Composants/Commun/register/register.component';
import { LoginComponent } from './Composants/Commun/login/login.component';
import { administrationGuard } from './Guards/administration.guard';
import { coachGuard } from './Guards/coach.guard';
import { Header1Component } from './Composants/Commun/header1/header1.component';
import { Header2Component } from './Composants/Commun/header2/header2.component';
import { AcceuilComponent } from './Composants/Visiteur/acceuil/acceuil.component';
import { FooterComponent } from './Composants/Commun/footer/footer.component';
import { RessourcesComponent } from './Composants/Visiteur/ressources/ressources.component';

import { EvenementComponent } from './Composants/Visiteur/evenement/evenement.component';
import { DetailEvenementComponent } from './Composants/Visiteur/detail-evenement/detail-evenement.component';
import { GuideComponent } from './Composants/Visiteur/guide/guide.component';
import { ForumComponent } from './Composants/Visiteur/forum/forum.component';
import { DetailForumComponent } from './Composants/Visiteur/detail-forum/detail-forum.component';
import { DetailRessourceComponent } from './Composants/Visiteur/detail-ressource/detail-ressource.component';
import { UserProfilComponent } from './Composants/Visiteur/user-profil/user-profil.component';
import { ModifierProfilComponent } from './Composants/Visiteur/modifier-profil/modifier-profil.component';
import { DemandeComponent } from './Composants/Visiteur/demande/demande.component';
import { DemandecoachComponent } from './Composants/Visiteur/demandecoach/demandecoach.component';
import { RetourExperienceComponent } from './Composants/Admin/retour-experience/retour-experience.component';
import { RetourExperienceAccueilComponent } from './Composants/Visiteur/retour-experience-accueil/retour-experience-accueil.component';
import { ModificationEvenementComponent } from './Composants/Admin/modification-evenement/modification-evenement.component';
import { AuthGuard } from './Guards/auth.guard';
import { GuideAdminComponent } from './Composants/Admin/guide-admin/guide-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Acceuil', pathMatch: 'full' },
  

  // Routes pour Coach
  {
    path: 'dashboard-coach',
    component: DashboardCoachComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'ressources-coach',
    component: RessourceComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'ressource-form',
    component: RessourceFormComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'ressource-form/:id',
    component: RessourceFormComponent,
    canActivate: [coachGuard],

  },
  {
    path: 'ressource-details/:id',
    // path: 'ressource-details',
    component: RessourceDetailComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'ressources-categorie',
    component: CategorieCoachComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'events-coach',
    component: EvenementCoachComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'events-details-coach/:id',
    // path: 'events-details-coach',
    component: DetailEvenementCoachComponent,
    canActivate: [coachGuard],
  },
  {
    path: 'profil-coach',
    component: ProfilCoachComponent,
    canActivate: [coachGuard],
  },

  // Routes pour Admin
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'access-admin',
    component: AccessAdminComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'access-users',
    component: AccessUsersComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'access-users-details/:id',
    // path: 'access-users-details',
    component: AccessUsersDetailComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'access-roles',
    component: AccessRolesComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'access-permissions',
    component: AccessPermissionsComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'evenement-admin',
    component: EvenementAdminComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'events-details-admin/:id',
    // path: 'events-details-admin',
    component: EvenementsDetailsAdminComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'reservations/:id',
    // path: 'reservations',
    component: ReservationsComponent,
    canActivate: [administrationGuard, AuthGuard],
  },
  {
    path: 'ajouter-evenement',
    component: AjoutEvenementComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'modification-evenement/:id',
    component: ModificationEvenementComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'profil-admin',
    component: ProfilAdminComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'retour-experience-admin',
    component: RetourExperienceComponent,
    canActivate: [administrationGuard],
  },
  {
    path: 'guide-admin',
    component: GuideAdminComponent,
    canActivate: [administrationGuard],
  },

  // Routes pour l'authentification
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes pour l'acceuil

  { path: 'evenement', component: EvenementComponent },
  { path: 'detail_evenement/:id', component: DetailEvenementComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'forum', component: ForumComponent , canActivate: [AuthGuard]},
  { path: 'forum-detail/:id', component: DetailForumComponent, canActivate: [AuthGuard] },

  { path: 'header1', component: Header1Component },
  { path: 'header2', component: Header2Component },
  { path: 'Acceuil', component: AcceuilComponent, },
  { path: 'footer', component: FooterComponent },

  { path: 'ressources', component: RessourcesComponent, canActivate: [AuthGuard] },
  { path: 'detail-ressource', component: DetailRessourceComponent , canActivate: [AuthGuard]},
  { path: 'profil-entrepreneur', component: UserProfilComponent , canActivate: [AuthGuard]},
  { path: 'modifier-profil', component: ModifierProfilComponent , canActivate: [AuthGuard]},

 { path:'demande-accompagnement', component:DemandeComponent, canActivate: [AuthGuard]},





    
    { path: 'demande-accompagnement-coach' , component: DemandecoachComponent, canActivate: [AuthGuard]},

    { path: 'retourexperience', component: RetourExperienceAccueilComponent},
  { path: 'detail-ressource/:id', component: DetailRessourceComponent },
  { path: 'profil-entrepreneur', component: UserProfilComponent, canActivate: [AuthGuard] },
  { path: 'modifier-profil/:id', component: ModifierProfilComponent },
  {
    path: 'mes-reservations',
    component: ReservationsComponent,
  },
    { path:'demande-accompagnement', component:DemandeComponent, canActivate: [AuthGuard]},
    
    { path: 'demande-accompagnement-coach/:id' , component: DemandecoachComponent, canActivate: [AuthGuard]},

    { path: 'retourexperience', component: RetourExperienceComponent}
];
