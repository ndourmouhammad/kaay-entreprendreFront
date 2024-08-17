import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { Header1Component } from './headerFooter/header1/header1.component';

import { Header2Component } from './headerFooter/header2/header2.component';
import { AcceuilComponent } from './AccueilComponant/acceuil/acceuil.component';

import { FooterComponent } from './headerFooter/footer/footer.component';


export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    {path:'header1',component:Header1Component},

    {path:'header2',component:Header2Component },
    {path:'Acceuil',component:AcceuilComponent },
    {path:'footer',component:FooterComponent}
];
