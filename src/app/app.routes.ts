import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { Header1Component } from './headerFooter/header1/header1.component';
import { Header2Component } from './headerFooter/header2/header2.component';
import { AccueilComponent } from './AccueilComponent/accueil/accueil.component';
import { FooterComponent } from './headerFooter/footer/footer.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    {path:'header1',component:Header1Component},
    {path:'footer',component:FooterComponent},
    {path:'userprofil',component:UserProfilComponent},
    {path:'modifier',component:ModifierProfilComponent},
];
