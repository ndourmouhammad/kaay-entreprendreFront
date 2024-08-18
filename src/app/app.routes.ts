import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { EvenementComponent } from './evenement/evenement.component';
import { DetailEvenementComponent } from './detail-evenement/detail-evenement.component';
import { GuideComponent } from './guide/guide.component';
import { ForumComponent } from './forum/forum.component';
import { DetailForumComponent } from './detail-forum/detail-forum.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    { path: 'evenement', component: EvenementComponent},
    { path: 'detail_evenement', component: DetailEvenementComponent},
    { path: 'guide', component: GuideComponent},
    { path: 'forum', component: ForumComponent},
    { path: 'detail-forum', component:DetailForumComponent}
    
];
