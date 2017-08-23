import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ContactsOurComponent} from './contacts-our/contacts-our.component';
import {MainCenterComponent} from './main-center/main-center.component';
import {AboutClinicComponent} from './about-clinic/about-clinic.component';
import {TeamClinicComponent} from './team-clinic/team-clinic.component';
import {FeedbackClientsComponent} from './feedback-clients/feedback-clients.component';
import {PresaAboutusComponent} from './presa-aboutus/presa-aboutus.component';
import {OnlineConsultationComponent} from './online-consultation/online-consultation.component';
import {PreoperativePreparationComponent} from './preoperative-preparation/preoperative-preparation.component';
import {MaterialsComponent} from './materials/materials.component';
import {UserComponent} from './user/user.component';
import {LoginUserComponent} from './login-user/login-user.component';
import {OfflineConsultationComponent} from './offline-consultation/offline-consultation.component';

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
    component: TeamClinicComponent
  },
  {
    path: 'feedbackclients',
    component: FeedbackClientsComponent
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
    path: 'loginuser',
    component: LoginUserComponent
  },
  {
    path: 'offlineconsultation',
    component: OfflineConsultationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
