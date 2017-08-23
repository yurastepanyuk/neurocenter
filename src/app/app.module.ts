import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { ContactsOurComponent } from './contacts-our/contacts-our.component';
import { MainCenterComponent } from './main-center/main-center.component';
import { AboutClinicComponent } from './about-clinic/about-clinic.component';
import { TeamClinicComponent } from './team-clinic/team-clinic.component';
import { FeedbackClientsComponent } from './feedback-clients/feedback-clients.component';
import { PresaAboutusComponent } from './presa-aboutus/presa-aboutus.component';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';
import { PreoperativePreparationComponent } from './preoperative-preparation/preoperative-preparation.component';
import { MaterialsComponent } from './materials/materials.component';
import { UserComponent } from './user/user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { OfflineConsultationComponent } from './offline-consultation/offline-consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    ContactsOurComponent,
    MainCenterComponent,
    AboutClinicComponent,
    TeamClinicComponent,
    FeedbackClientsComponent,
    PresaAboutusComponent,
    OnlineConsultationComponent,
    PreoperativePreparationComponent,
    MaterialsComponent,
    UserComponent,
    LoginUserComponent,
    OfflineConsultationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }