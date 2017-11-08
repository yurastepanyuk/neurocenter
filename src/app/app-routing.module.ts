import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ContactsOurComponent} from './contacts-our/contacts-our.component';
import {MainCenterComponent} from './main-center/main-center.component';
import {AboutClinicComponent} from './about-clinic/about-clinic.component';
import {PresaAboutusComponent} from './presa-aboutus/presa-aboutus.component';
import {OnlineConsultationComponent} from './online-consultation/online-consultation.component';
import {PreoperativePreparationComponent} from './preoperative-preparation/preoperative-preparation.component';
import {MaterialsComponent} from './materials/materials.component';
import {UserComponent} from './user/user.component';
import {OfflineConsultationComponent} from './offline-consultation/offline-consultation.component';
import {LoginComponent} from './login/login.component';
import {ClientsListComponent} from './clients/clients-list/clients-list.component';
import {AuthGuard} from './auth.guard';
import {FeedbackListComponent} from './feedback/feedback-list/feedback-list.component';
import {TeamClinicListComponent} from './team-clinic/team-clinic-list/team-clinic-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  {
    path: 'mainpage',
    component: MainCenterComponent
  },
  {
    path: 'contacts',
    component: ContactsOurComponent
  },
  {
    path: 'aboutclinic',
    component: AboutClinicComponent
  },
  {
    path: 'teamclinic',
    component: TeamClinicListComponent
  },
  {
    path: 'feedbackclients',
    component: FeedbackListComponent
  },
  {
    path: 'pressaaboutus',
    component: PresaAboutusComponent
  },
  {
    path: 'onlineconsultation',
    component: OnlineConsultationComponent
  },
  {
    path: 'preoperativepreparation',
    component: PreoperativePreparationComponent
  },
  {
    path: 'materials',
    component: MaterialsComponent
  },
  {
    path: 'adduser',
    component: UserComponent
  },
  {
    path: 'offlineconsultation',
    component: OfflineConsultationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clients',
    component: ClientsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
